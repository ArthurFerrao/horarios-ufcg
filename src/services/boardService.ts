import { HORARIOS_DEFAULT } from '../constants'

const hourSort = (a: hora, b: hora) => {
  const inicioA = a.inicio.replace(':', '.')
  const inicioB = b.inicio.replace(':', '.')
  return parseFloat(inicioA) > parseFloat(inicioB) ? 1 : -1
}

const isHorarioDefault = (hour: hora) =>
  HORARIOS_DEFAULT.some((h) => h.id === hour.id)

const getHours = (disciplinas: Disciplina[]) => {
  const hours = [
    ...disciplinas.map((disciplina) => disciplina.horario),
    HORARIOS_DEFAULT,
  ]
  const horarios = hours.reduce<{ [key: string]: hora }>((prev, curr) => {
    const newPrev = prev
    curr.forEach((horario) => {
      newPrev[horario.id] = horario
    })
    return newPrev
  }, {})

  return Object.values(horarios)
}

const hasHour = (disciplina: Disciplina, hour: hora) =>
  disciplina.horario.some((h) => h.id === hour.id)

const getDisciplinasByHour = (disciplinas: Disciplina[], hour: hora) =>
  disciplinas.filter(
    (disciplina) => hasHour(disciplina, hour) && disciplina.checked,
  )

const disciplinasByHourMap = (disciplinas: Disciplina[]) =>
  getHours(disciplinas).map((hour) => ({
    horario: hour,
    disciplinas: getDisciplinasByHour(disciplinas, hour),
  }))

const rowBordList = (disciplinasList: Disciplina[]) =>
  disciplinasByHourMap(disciplinasList)
    .sort((a, b) => hourSort(a.horario, b.horario))
    .filter(
      ({ horario, disciplinas }) =>
        disciplinas.length !== 0 || isHorarioDefault(horario),
    )

export default rowBordList
