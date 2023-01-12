import { ChakraProvider, useDisclosure } from '@chakra-ui/react'
import React from 'react'

import NavBar from './components/NavBar'

function App() {
  const disclosure = useDisclosure()
  const { onOpen } = disclosure

  return (
    <ChakraProvider>
      <div className='App'>
        <NavBar openSidebar={onOpen} />
      </div>
    </ChakraProvider>
  )
}

export default App
