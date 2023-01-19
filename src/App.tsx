import { ChakraProvider, useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import ImportModal from './components/ImportModal'
import NavBar from './components/NavBar'
import Sidebar from './components/Sidebar'
import WeekBoard from './components/WeekBoard'
import { AppProvider } from './context'
import theme from './theme'

function App() {
  const {
    onOpen: onOpenModal,
    isOpen: isOpenModal,
    onClose: onCloseModal,
  } = useDisclosure()
  const {
    onOpen: onOpenSideBar,
    isOpen: isOpenSideBar,
    onClose: onCloseSideBar,
  } = useDisclosure()

  useEffect(() => {
    onOpenModal()
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <div className='App'>
          <NavBar openSidebar={onOpenSideBar} />
          <Sidebar
            isOpenSideBar={isOpenSideBar}
            onCloseSideBar={onCloseSideBar}
            onOpenModal={onOpenModal}
          />
          <WeekBoard />

          <ImportModal isOpenModal={isOpenModal} onCloseModal={onCloseModal} />
        </div>
      </AppProvider>
    </ChakraProvider>
  )
}

export default App
