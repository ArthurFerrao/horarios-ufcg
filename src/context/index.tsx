/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState, useMemo } from 'react'

interface AppContextProps {
  disciplinas: Disciplina[]
  updateDisciplinas: (disciplina: Disciplina[]) => void
  handleChangeDisciplinaCheck: (id: string, isChecked: boolean) => void
  handleChangeAllPeriodoCheck: (periodo: number, isChecked: boolean) => void
}

const AppContext = createContext<AppContextProps>({
  disciplinas: [],
  updateDisciplinas: () => {},
  handleChangeDisciplinaCheck: () => {},
  handleChangeAllPeriodoCheck: () => {},
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
  const appProviderValue = useMemo(
    () => ({
      disciplinas: data,
      updateDisciplinas,
      handleChangeDisciplinaCheck,
      handleChangeAllPeriodoCheck,
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
