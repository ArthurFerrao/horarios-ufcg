import * as PDFJS from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'

const textDenyList = [
  '',
  ' ',
  'UNIVERSIDADE FEDERAL DE CAMPINA GRANDE',
  'PRÓ-REITORIA DE ENSINO',
  'TURMAS OFERTADAS',
  'Disciplina',
  'Turma',
  'CR',
  'CH',
  'Horários',
  'Ofertada para:',
  'Saldo / Ofer.',
  'TOTAL:',
  'Professores:',
]

const cursoCodeAndNameRegex = /^[0-9]{1,5} - .*/

const regexDenyList = [
  cursoCodeAndNameRegex,
  /^Saldo \/ Ofer. .*/,
  /^Período:.*/,
  /^[0-9]{8} - .*/,
  /^[0-9]* \/ [0 - 9]*/,
  /^- [a-zA-Z ]*/,
  /^[0-9]*\/[0-9]*\/[0-9]* [0-9]*:[0-9]*:[0-9]*/,
]

const disciplinaCodeAndNameRegex = /^[0-9]* - .*/

async function getPageText(pdf, pageNumber) {
  const page = await pdf.getPage(pageNumber)

  const textContent = await page.getTextContent()
  return textContent.items.map((s) => s.str)
}

async function getText(file) {
  PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker
  const document = PDFJS.getDocument(file)
  const pdf = await document.promise
  const maxPages = pdf.numPages

  const storePromises = []
  for (let j = 1; j <= maxPages; j += 1) {
    storePromises.push(getPageText(pdf, j))
  }

  return Promise.all(storePromises).then((pages) => {
    let concatList = []
    pages.forEach((text) => {
      concatList = [...concatList, ...text]
    })
    return concatList
  })
}

function cleanText(textList) {
  let newList = textList.filter(
    (text) => !textDenyList.some((el) => el === text),
  )
  newList = newList.filter((text) => !regexDenyList.some((el) => el.test(text)))
  return newList
}

function formatSchedule(schedule) {
  const [dia, horas] = schedule.split(' ')
  const [inicio, fim] = horas.split('-')

  return {
    dia,
    inicio,
    fim,
  }
}

function textListToJson(dataList) {
  const json = []
  let blockCount = 0
  let disciplinaObj = null

  dataList.forEach((data) => {
    if (disciplinaCodeAndNameRegex.test(data)) {
      if (disciplinaObj !== null) {
        json.push(disciplinaObj)
      }

      blockCount = 0
      const [codigo, nome] = data.split(' - ')
      disciplinaObj = {
        codigo,
        nome,
        horario: [],
      }
    }

    if (blockCount === 1) {
      disciplinaObj.turma = data
    } else if (blockCount >= 4) {
      disciplinaObj.horario.push(formatSchedule(data))
    }

    blockCount++
  })

  return json
}

function getCursoData(dataList) {
  const cursoData = {
    nomeCurso: null,
    codigoCurso: null,
  }
  const cursoText = dataList.find((data) => cursoCodeAndNameRegex.test(data))

  if (cursoText) {
    const [codigo, nome] = cursoText.split(' - ')
    cursoData.codigoCurso = codigo
    cursoData.nomeCurso = nome
  }

  return cursoData
}

export default async function extractData(file) {
  const dataList = await getText(file)
  const cursoData = getCursoData(dataList)
  const clearData = cleanText(dataList)
  const disciplinas = textListToJson(clearData)

  const data = {
    ...cursoData,
    disciplinas,
  }

  return data
}
