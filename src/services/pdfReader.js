import * as PDFJS from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'

const textDenyList = [
  '',
  ' ',
  'UNIVERSIDADE FEDERAL DE CAMPINA GRANDE',
  'PRÓ-REITORIA DE ENSINO',
  'TURMAS OFERTADAS',
  '14102 - CIÊNCIA DA COMPUTAÇÃO - D',
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

const regexDenyList = [
  /^Período:.*/,
  /^[0-9]{8} - .*/,
  /^[0-9]* \/ [0 - 9]*/,
  /^- [a-zA-Z ]*/,
  /^[0-9]*\/[0-9]*\/[0-9]* [0-9]*:[0-9]*:[0-9]*/,
]

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

function textListToJson(textList) {
  const json = []
  const disciplinaNameRegex = /^[0-9]* - .*/
  let blockCount = 0
  let obj = {}

  textList.forEach((el) => {
    if (disciplinaNameRegex.test(el)) {
      if (obj !== {}) {
        json.push(obj)
      }

      blockCount = 0
      const [codigo, nome] = el.split(' - ')
      obj = {
        codigo,
        nome,
      }
    }

    if (blockCount === 1) {
      obj.turma = el
    } else if (blockCount >= 4) {
      obj.horario = formatSchedule(el)
    }

    blockCount++
  })
  return json
}

export default async function extractData(file) {
  const textList = await getText(file)
  const textCleaner = cleanText(textList)

  return textListToJson(textCleaner)
}
