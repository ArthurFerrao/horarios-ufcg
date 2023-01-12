import { Stack, Box, Collapse, useDisclosure } from '@chakra-ui/react'
import React from 'react'

import DisciplinaItem from './DisciplinaItem'
import PeriodoHeader from './PeriodoHeader'

interface PeriodoBlockProps {
  periodoNumber: number
  items: Disciplina[]
}

function PeriodoBlock({ periodoNumber, items }: PeriodoBlockProps) {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box px={5}>
      <PeriodoHeader
        periodoNumber={periodoNumber}
        items={items}
        onToggle={onToggle}
        isOpen={isOpen}
      />
      <Collapse in={isOpen} animateOpacity>
        <Stack my={4} spacing={4}>
          {items.map((item) => (
            <DisciplinaItem
              key={item.id}
              id={item.id}
              name={item.nome}
              turma={item.turma}
              isChecked={item.checked}
            />
          ))}
        </Stack>
      </Collapse>
    </Box>
  )
}

export default PeriodoBlock
