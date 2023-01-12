// eslint-disable-next-line prettier/prettier
export { }

declare global {
  type horario = {
    dia: string
    inicio: string
    fim: string
  }

  type Disciplina = {
    id: string
    codigo: string
    nome: string
    periodo: number
    turma: number
    tipo: string
    professor?: string
    horario: horario[]
    checked: boolean
  }
}
