import { ChakraProvider, useDisclosure } from '@chakra-ui/react'
import React from 'react'

import NavBar from './components/NavBar'
import Sidebar from './components/Sidebar'
import WeekBoard from './components/WeekBoard'
import { AppProvider } from './context'
import theme from './theme'

function App() {
  const disclosure = useDisclosure()
  const { onOpen } = disclosure

  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <div className='App'>
          <NavBar openSidebar={onOpen} />
          <Sidebar disclosure={disclosure} />
          <WeekBoard />
        </div>
      </AppProvider>
    </ChakraProvider>
  )
}

export default App
