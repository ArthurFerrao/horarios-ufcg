import extractData from './pdfReader'

export default async function getData(file: File | any) {
  const data = await extractData(file)
  const disciplinas = data.disciplinas.map((disciplina) => ({
    ...disciplina,
    id: `${disciplina.codigo}-${disciplina.turma}`,
    checked: false,
    marked: false,
    periodo: disciplina.periodo ? disciplina.periodo : 0,
  }))

  return {
    ...data,
    disciplinas,
  }
}
