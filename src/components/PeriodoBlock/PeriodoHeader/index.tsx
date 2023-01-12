import { Checkbox, Flex, Heading, IconButton, Spacer } from '@chakra-ui/react'
import React from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

import useAppContext from '../../../hooks/useAppContext'

interface PeriodoHeaderProps {
  periodoNumber: number
  items: Disciplina[]
  onToggle: () => void
  isOpen: boolean
}

function PeriodoHeader({
  periodoNumber,
  items,
  onToggle,
  isOpen,
}: PeriodoHeaderProps) {
  const allChecked = items.every((item) => item.checked)
  const isIndeterminate = items.some((item) => item.checked) && !allChecked
  const { handleChangeAllPeriodoCheck } = useAppContext()

  return (
    <Flex alignItems='center'>
      <Checkbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) =>
          handleChangeAllPeriodoCheck(periodoNumber, e.target.checked)
        }
      />
      <Spacer />
      <Heading color='blackAlpha.800' fontWeight='semibold' size='sm'>
        {`${periodoNumber}° Período`}
      </Heading>
      <Spacer />
      <IconButton
        onClick={onToggle}
        size='sm'
        aria-label='arrow-down'
        colorScheme='blackAlpha'
        variant='ghost'
        icon={isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      />
    </Flex>
  )
}

export default PeriodoHeader
