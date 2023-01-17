import {
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  Drawer,
  DrawerBody,
  UseDisclosureReturn,
  VStack,
  StackDivider,
} from '@chakra-ui/react'
import React from 'react'

import useAppContext from '../../hooks/useAppContext'
import PeriodoBlock from '../PeriodoBlock'
import ImportButton from './ImportButton'

interface SidebarPorps {
  disclosure: UseDisclosureReturn
}

function Sidebar({ disclosure }: SidebarPorps) {
  const { disciplinas } = useAppContext()
  const { isOpen, onClose } = disclosure

  const disciplinasByPeriodo = disciplinas.reduce<Map<number, Disciplina[]>>(
    (prev, curr) => {
      let { periodo } = curr
      if (!periodo) {
        periodo = 0
      }
      return prev.set(periodo, [...(prev.get(periodo) ?? []), curr])
    },
    new Map(),
  )

  const periodoBlockComponents = Array.from(disciplinasByPeriodo.keys())
    .sort()
    .map((periodo) => (
      <PeriodoBlock
        key={periodo}
        periodoNumber={periodo}
        items={disciplinasByPeriodo.get(periodo) ?? []}
      />
    ))

  return (
    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader bg='blackAlpha.100' textAlign='center'>
          <ImportButton />
        </DrawerHeader>
        <DrawerBody p={0} bg='blackAlpha.100'>
          <VStack
            divider={<StackDivider borderColor='blackAlpha.500' />}
            spacing={4}
            align='stretch'
          >
            {periodoBlockComponents}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default Sidebar
