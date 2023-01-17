import cursosExtraData from '../data'
import extractData from './pdfReader'

async function addExtraData(disciplinas: Disciplina[], codigoCurso: string) {
  const extraData = cursosExtraData[codigoCurso]
  if (!extraData) {
    return disciplinas
  }

  return disciplinas.map((disciplina) => {
    let periodo = 0
    if (extraData) {
      const newData = extraData.find(
        (data: any) => data.codigoDisciplina === disciplina.codigo,
      )
      periodo = newData.periodo
    }

    return {
      ...disciplina,
      id: `${disciplina.codigo}-${disciplina.turma}`,
      checked: false,
      marked: false,
      periodo,
    }
  })
}

export default async function getData(file: File | any) {
  const data = await extractData(file)
  const disciplinas = await addExtraData(
    data.disciplinas,
    data.codigoCurso ?? '',
  )

  return {
    ...data,
    disciplinas,
  }
}
