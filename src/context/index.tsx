/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState, useMemo } from 'react'

interface AppContextProps {
  disciplinas: Disciplina[]
  updateDisciplinas: (disciplina: Disciplina[]) => void
  setCheckedById: (id: string, isChecked: boolean) => void
  setCheckedByPeriodo: (periodo: number, isChecked: boolean) => void
  setMarkedById: (id: string) => void
}

const AppContext = createContext<AppContextProps>({
  disciplinas: [],
  updateDisciplinas: () => {},
  setCheckedById: () => {},
  setCheckedByPeriodo: () => {},
  setMarkedById: () => {},
})

function AppProvider({ children }: { children: JSX.Element }) {
  const [data, setData] = useState<Disciplina[]>([])

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

  const setMarkedById = (id: string) => {
    const newData = data.map((disciplina) =>
      disciplina.id === id
        ? { ...disciplina, marked: !disciplina.marked }
        : disciplina,
    )
    setData(newData)
  }

  const appProviderValue = useMemo(
    () => ({
      disciplinas: data,
      updateDisciplinas,
      setCheckedById,
      setCheckedByPeriodo,
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
