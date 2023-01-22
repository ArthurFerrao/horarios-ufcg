// eslint-disable-next-line prettier/prettier
export {}

declare global {
  type Hora = {
    id: string
    inicio: string
    fim: string
  }

  type Horario = Hora & {
    dia: string
  }

  type DisciplinaPdf = {
    codigo: string
    nome: string
    turma: string
    horario: horario[]
    professores: string[]
  }

  type Disciplina = DisciplinaPdf & {
    id: string
    periodo?: number
    tipo?: string
    professor?: string
    checked: boolean
    marked: boolean
  }
}
