// eslint-disable-next-line prettier/prettier
export {}

declare global {
  type hora = {
    id: string
    inicio: string
    fim: string
  }

  type horario = {
    id: string
    dia: string
    inicio: string
    fim: string
  }

  type Disciplina = {
    id: string
    codigo: string
    nome: string
    periodo?: number
    turma: number
    tipo?: string
    professor?: string
    horario: horario[]
    checked: boolean
    marked: boolean
  }
}
