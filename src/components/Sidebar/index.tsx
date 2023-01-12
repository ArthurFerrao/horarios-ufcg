import {
  Button,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  Drawer,
  DrawerBody,
  UseDisclosureReturn,
  Text,
  HStack,
} from '@chakra-ui/react'
import React from 'react'
import { BiImport } from 'react-icons/bi'

function ImportButton() {
  return (
    <Button colorScheme='blackAlpha' variant='ghost'>
      <HStack color='blackAlpha.900'>
        <BiImport />
        <Text>Importar disciplinas</Text>
      </HStack>
    </Button>
  )
}

interface SidebarPorps {
  disclosure: UseDisclosureReturn
}

function Sidebar({ disclosure }: SidebarPorps) {
  const { isOpen, onClose } = disclosure
  return (
    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader bg='blackAlpha.100' textAlign='center'>
          <ImportButton />
        </DrawerHeader>
        <DrawerBody p={0} bg='blackAlpha.100' />
      </DrawerContent>
    </Drawer>
  )
}

export default Sidebar
