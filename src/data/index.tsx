import curso14102 from './14102.json'

type cursosExtraDataType = {
  [key: string]: { codigoDisciplina: string; periodo: number }[]
}

const cursosExtraData: cursosExtraDataType = {
  '14102': curso14102,
}

export default cursosExtraData
