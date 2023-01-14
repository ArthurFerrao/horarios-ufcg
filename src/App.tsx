import { ChakraProvider, useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import NavBar from './components/NavBar'
import Sidebar from './components/Sidebar'
import WeekBoard from './components/WeekBoard'
import useAppContext from './hooks/useAppContext'
import turmas from './mock/turmas-ofertadas.json'
import theme from './theme'

function App() {
  const { updateDisciplinas } = useAppContext()
  useEffect(() => {
    updateDisciplinas(turmas.disciplinas)
  }, [])
  const disclosure = useDisclosure()
  const { onOpen } = disclosure

  return (
    <ChakraProvider theme={theme}>
      <div className='App'>
        <NavBar openSidebar={onOpen} />
        <Sidebar disclosure={disclosure} />
        <WeekBoard />
      </div>
    </ChakraProvider>
  )
}

export default App
