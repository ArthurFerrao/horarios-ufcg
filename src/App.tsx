import { ChakraProvider, useDisclosure } from '@chakra-ui/react'
import React from 'react'

import NavBar from './components/NavBar'
import Sidebar from './components/Sidebar'
import WeekBoard from './components/WeekBoard'
import theme from './theme'

function App() {
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
