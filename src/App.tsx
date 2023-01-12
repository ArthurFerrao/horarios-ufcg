import { ChakraProvider, useDisclosure } from '@chakra-ui/react'
import React from 'react'

import NavBar from './components/NavBar'
import Sidebar from './components/Sidebar'

function App() {
  const disclosure = useDisclosure()
  const { onOpen } = disclosure

  return (
    <ChakraProvider>
      <div className='App'>
        <NavBar openSidebar={onOpen} />
        <Sidebar disclosure={disclosure} />
      </div>
    </ChakraProvider>
  )
}

export default App
