import { ChakraProvider, extendTheme, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'

import NavBar from './components/NavBar'
import Sidebar from './components/Sidebar'
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
  const [disciplinas, setDisciplinas] = useState(turmas.disciplinas)
  const disclosure = useDisclosure()
  const { onOpen } = disclosure

  const handleCheckDisciplina = (id: string, isChecked: boolean) => {
    const newState = disciplinas.map((item) =>
      item.id === id ? { ...item, checked: isChecked } : item,
    )

    setDisciplinas(newState)
  }

  const handleCheckAllDisciplina = (periodo: number, isChecked: boolean) => {
    const newState = disciplinas.map((item) => {
      if (item.periodo === periodo) {
        return {
          ...item,
          checked: isChecked,
        }
      }
      return item
    })

    setDisciplinas(newState)
  }

  return (
    <ChakraProvider theme={theme}>
      <div className='App'>
        <NavBar openSidebar={onOpen} />
        <Sidebar
          disciplinas={disciplinas}
          disclosure={disclosure}
          handleCheckAllDisciplina={handleCheckAllDisciplina}
          handleCheckDisciplina={handleCheckDisciplina}
        />
      </div>
    </ChakraProvider>
  )
}

export default App
