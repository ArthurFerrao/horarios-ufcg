import getText from './pdfReaderService'

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
  /^[0-9]*\/[0-9]*\/[0-9]* [0-9]*:[0-9]*:[0-9]*/,
]

const professorNameRegex = /^- [a-zA-Z ]*/
const disciplinaCodeAndNameRegex = /^[0-9]* - .*/

function cleanText(textList: string[]) {
  let newList = textList.filter(
    (text) => !textDenyList.some((el) => el === text),
  )
  newList = newList.filter((text) => !regexDenyList.some((el) => el.test(text)))
  return newList
}

function formatSchedule(schedule: string) {
  const [dia, horas] = schedule.split(' ')
  const [inicio, fim] = horas.split('-')

  return {
    dia,
    inicio,
    fim,
  }
}

function formatProfessorData(data: string) {
  const [_, nome] = data.split('- ')
  return nome
}

function textListToJson(dataList: string[]) {
  const json: DisciplinaPdf[] = []
  let blockCount = 0
  let disciplinaObj: DisciplinaPdf

  dataList.forEach((data) => {
    if (disciplinaCodeAndNameRegex.test(data)) {
      if (disciplinaObj) {
        json.push(disciplinaObj)
      }

      blockCount = 0
      const [codigo, nome] = data.split(' - ')
      disciplinaObj = {
        codigo,
        nome,
        horario: [],
        turma: '',
        professores: [],
      }
    }

    if (blockCount === 1) {
      disciplinaObj.turma = data
    } else if (professorNameRegex.test(data)) {
      disciplinaObj.professores.push(formatProfessorData(data))
    } else if (blockCount >= 4) {
      disciplinaObj.horario.push(formatSchedule(data))
    }

    blockCount++
  })

  return json
}

function getCursoData(dataList: string[]) {
  const cursoData = {
    nomeCurso: '',
    codigoCurso: '',
  }
  const cursoText = dataList.find((data) => cursoCodeAndNameRegex.test(data))

  if (cursoText) {
    const [codigo, nome] = cursoText.split(' - ')
    cursoData.codigoCurso = codigo
    cursoData.nomeCurso = nome
  }

  return cursoData
}

export default async function getTurmasOfertadasData(
  file: string | ArrayBuffer,
) {
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
