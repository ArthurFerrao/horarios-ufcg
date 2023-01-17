/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState, useMemo } from 'react'

import { HORARIOS_DEFAULT } from '../constants'

interface AppContextProps {
  disciplinas: Disciplina[]
  updateDisciplinas: (disciplina: Disciplina[]) => void
  handleChangeDisciplinaCheck: (id: string, isChecked: boolean) => void
  handleChangeAllPeriodoCheck: (periodo: number, isChecked: boolean) => void
  getDisciplinasByHour: (hour: hora, onlyChecked: boolean) => Disciplina[]
  markDisciplina: (id: string) => void
  getHours: () => hora[]
}

const AppContext = createContext<AppContextProps>({
  disciplinas: [],
  updateDisciplinas: () => {},
  handleChangeDisciplinaCheck: () => {},
  handleChangeAllPeriodoCheck: () => {},
  getDisciplinasByHour: () => [],
  markDisciplina: () => {},
  getHours: () => [],
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

  const getDisciplinasByHour = (hour: hora, onlyChecked: boolean) => {
    const hasHour = (disciplina: Disciplina) =>
      disciplina.horario.some(
        (value) => value.inicio === hour.inicio && value.fim === hour.fim,
      )

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

  const getHours = () => {
    const hours = [...data.map((el) => el.horario), HORARIOS_DEFAULT]
    const horarios = hours.reduce<{ [key: string]: hora }>((prev, curr) => {
      const newPrev = prev
      curr.forEach((horario) => {
        newPrev[horario.id] = horario
      })
      return newPrev
    }, {})

    return Object.values(horarios)
  }

  const appProviderValue = useMemo(
    () => ({
      disciplinas: data,
      updateDisciplinas,
      handleChangeDisciplinaCheck,
      handleChangeAllPeriodoCheck,
      getDisciplinasByHour,
      markDisciplina,
      getHours,
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
