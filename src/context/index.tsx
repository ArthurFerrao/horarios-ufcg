/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState, useMemo, useEffect } from 'react'

import { HORARIOS_DEFAULT } from '../constants'

interface AppContextProps {
  disciplinas: Disciplina[]
  boardHours: hora[]
  updateDisciplinas: (disciplina: Disciplina[]) => void
  setCheckedById: (id: string, isChecked: boolean) => void
  setCheckedByPeriodo: (periodo: number, isChecked: boolean) => void
  getDisciplinasByHour: (hour: hora, onlyChecked: boolean) => Disciplina[]
  setMarkedById: (id: string) => void
}

const AppContext = createContext<AppContextProps>({
  disciplinas: [],
  boardHours: [],
  updateDisciplinas: () => {},
  setCheckedById: () => {},
  setCheckedByPeriodo: () => {},
  getDisciplinasByHour: () => [],
  setMarkedById: () => {},
})

function AppProvider({ children }: { children: JSX.Element }) {
  const [data, setData] = useState<Disciplina[]>([])
  const [boardHours, setBoardHours] = useState<hora[]>(HORARIOS_DEFAULT)

  const updateDisciplinas = (disciplinas: Disciplina[]) => {
    setData(disciplinas)
  }

  const setCheckedById = (id: string, isChecked: boolean) => {
    const newState = data.map((item) =>
      item.id === id ? { ...item, checked: isChecked } : item,
    )

    setData(newState)
  }

  const setCheckedByPeriodo = (periodo: number, isChecked: boolean) => {
    const newState = data.map((item) =>
      item.periodo === periodo ? { ...item, checked: isChecked } : item,
    )

    setData(newState)
  }

  const getDisciplinasByHour = (hour: hora, onlyChecked: boolean) => {
    const hasHour = (disciplina: Disciplina) =>
      disciplina.horario.some((h) => h.id === hour.id)

    return data.filter(
      (disciplina) =>
        hasHour(disciplina) && (onlyChecked ? disciplina.checked : true),
    )
  }

  const setMarkedById = (id: string) => {
    const newData = data.map((disciplina) =>
      disciplina.id === id
        ? { ...disciplina, marked: !disciplina.marked }
        : disciplina,
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

  useEffect(() => {
    setBoardHours(getHours())
  }, [data])

  const appProviderValue = useMemo(
    () => ({
      disciplinas: data,
      boardHours,
      updateDisciplinas,
      setCheckedById,
      setCheckedByPeriodo,
      getDisciplinasByHour,
      setMarkedById,
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
