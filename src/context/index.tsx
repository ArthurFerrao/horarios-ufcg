/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState, useMemo } from 'react'

import formatHour from '../utils/hourFormatter'

interface AppContextProps {
  disciplinas: Disciplina[]
  updateDisciplinas: (disciplina: Disciplina[]) => void
  handleChangeDisciplinaCheck: (id: string, isChecked: boolean) => void
  handleChangeAllPeriodoCheck: (periodo: number, isChecked: boolean) => void
  getDisciplinasByHour: (hour: string, onlyChecked: boolean) => Disciplina[]
  markDisciplina: (id: string) => void
}

const AppContext = createContext<AppContextProps>({
  disciplinas: [],
  updateDisciplinas: () => {},
  handleChangeDisciplinaCheck: () => {},
  handleChangeAllPeriodoCheck: () => {},
  getDisciplinasByHour: () => [],
  markDisciplina: () => {},
})

function AppProvider({ children }: { children: JSX.Element }) {
  const [data, setData] = useState<Disciplina[]>([])

  const updateDisciplinas = (disciplinas: Disciplina[]) => {
    setData(disciplinas)
  }

  const handleChangeDisciplinaCheck = (id: string, isChecked: boolean) => {
    const newState = data.map((item) =>
      item.id === id ? { ...item, checked: isChecked } : item,
    )

    setData(newState)
  }

  const handleChangeAllPeriodoCheck = (periodo: number, isChecked: boolean) => {
    const newState = data.map((item) => {
      if (item.periodo === periodo) {
        return {
          ...item,
          checked: isChecked,
        }
      }
      return item
    })

    setData(newState)
  }

  const getDisciplinasByHour = (hour: string, onlyChecked: boolean) => {
    const hasHour = (disciplina: Disciplina) =>
      disciplina.horario.some((value) => formatHour(value.inicio) === hour)

    return data.filter(
      (disciplina) =>
        hasHour(disciplina) && (onlyChecked ? disciplina.checked : true),
    )
  }

  const markDisciplina = (id: string) => {
    const newData = data.map((v) =>
      v.id === id ? { ...v, marked: !v.marked } : v,
    )
    setData(newData)
  }

  const appProviderValue = useMemo(
    () => ({
      disciplinas: data,
      updateDisciplinas,
      handleChangeDisciplinaCheck,
      handleChangeAllPeriodoCheck,
      getDisciplinasByHour,
      markDisciplina,
    }),
    [data],
  )

  return (
    <AppContext.Provider value={appProviderValue}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
