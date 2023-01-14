import { GridItem, Text } from '@chakra-ui/react'
import React from 'react'

interface HeaderBoardProps {
  hour: string
  days: string[]
  colored?: boolean
}

function HeaderBoard({ hour, days, colored = false }: HeaderBoardProps) {
  const isLast = (id: number) => id + 1 === days.length
  return (
    <>
      <GridItem bg={colored ? 'blackAlpha.100' : ''} textAlign='center' py='2'>
        <Text color='primary.400' fontWeight='semibold'>
          {hour}h
        </Text>
      </GridItem>
      {days.map((day, id) => (
        <GridItem
          key={day}
          bg={colored ? 'blackAlpha.100' : ''}
          borderRight={!isLast(id) ? 'solid #CECECE 2px' : ''}
        >
          {day}
        </GridItem>
      ))}
    </>
  )
}

export default HeaderBoard
