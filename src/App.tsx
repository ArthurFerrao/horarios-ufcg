import { ChakraProvider, extendTheme, useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import NavBar from './components/NavBar'
import Sidebar from './components/Sidebar'
import useAppContext from './hooks/useAppContext'
import turmas from './mock/turmas-ofertadas.json'

const theme = extendTheme({
  components: {
    Checkbox: {
      baseStyle: {
        control: {
          borderColor: 'blackAlpha.600',
          _checked: {
            bg: 'purple.800',
            borderColor: 'purple.800',
            _hover: { bg: 'purple.800', borderColor: 'purple.800' },
          },
          _indeterminate: {
            bg: 'purple.800',
            borderColor: 'purple.800',
          },
        },
      },
    },
  },
})

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
      </div>
    </ChakraProvider>
  )
}

export default App
