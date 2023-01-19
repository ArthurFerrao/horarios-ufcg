import { Tag } from '@chakra-ui/react'
import React from 'react'

import useAppContext from '../../../hooks/useAppContext'

const hover = {
  backgroundColor: 'primary.50',
  border: '2px solid',
  borderColor: 'primary.200',
  color: '#ffffff',
  transform: 'scale(1.04)',
  cursor: 'pointer',
}

interface DisciplinaTagProps {
  disciplina: Disciplina
}

function DisciplinaTag({ disciplina }: DisciplinaTagProps) {
  const { setMarkedById } = useAppContext()

  return (
    <Tag
      size='sm'
      bg={disciplina.marked ? 'primary.300' : '#E1DFDF'}
      border='solid 2px #CECECE'
      borderColor={disciplina.marked ? 'primary.500' : '#CECECE'}
      color={disciplina.marked ? 'white' : 'black'}
      mr='1'
      _hover={hover}
      onClick={() => {
        setMarkedById(disciplina.id)
      }}
    >
      {`${disciplina.nome} - t${disciplina.turma}`}
    </Tag>
  )
}

export default DisciplinaTag
