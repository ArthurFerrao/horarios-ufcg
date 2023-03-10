import { Checkbox, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'

import useAppContext from '../../../hooks/useAppContext'

interface DisciplinaItemProps {
  id: string
  name: string
  turma: string
  isChecked: boolean
}

function DisciplinaItem({ id, name, turma, isChecked }: DisciplinaItemProps) {
  const { setCheckedById } = useAppContext()

  return (
    <Checkbox
      size='sm'
      isChecked={isChecked}
      onChange={(e) => {
        setCheckedById(id, e.target.checked)
      }}
    >
      <Tooltip hasArrow label={name} placement='right'>
        <Text
          fontSize='xs'
          color='blackAlpha.700'
          fontWeight='bold'
          textOverflow='ellipsis'
          overflow='hidden'
          whiteSpace='nowrap'
          w='16rem'
        >
          {`t${turma} - ${name}`}
        </Text>
      </Tooltip>
    </Checkbox>
  )
}

export default DisciplinaItem
