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

import PeriodoBlock from '../PeriodoBlock'
import ImportButton from './ImportButton'

interface SidebarPorps {
  disciplinas: Disciplina[]
  disclosure: UseDisclosureReturn
  handleCheckDisciplina: (id: string, isChecked: boolean) => void
  handleCheckAllDisciplina: (periodo: number, isChecked: boolean) => void
}

function Sidebar({
  disciplinas,
  disclosure,
  handleCheckDisciplina,
  handleCheckAllDisciplina,
}: SidebarPorps) {
  const { isOpen, onClose } = disclosure

  const disciplinasByPeriodo = disciplinas.reduce<Map<number, Disciplina[]>>(
    (prev, curr) => {
      const { periodo } = curr
      const newMap = prev
      newMap.set(periodo, [...(prev.get(periodo) ?? []), curr])

      return newMap
    },
    new Map(),
  )

  const periodoBlockComponents = Array.from(disciplinasByPeriodo.keys())
    .sort()
    .map((periodo) => (
      <PeriodoBlock
        periodoNumber={periodo}
        items={disciplinasByPeriodo.get(periodo) ?? []}
        handleCheckDisciplina={handleCheckDisciplina}
        handleCheckAllDisciplina={handleCheckAllDisciplina}
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
