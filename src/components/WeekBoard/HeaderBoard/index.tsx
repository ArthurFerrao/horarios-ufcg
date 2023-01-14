import { GridItem, Text } from '@chakra-ui/react'
import React from 'react'

interface HeaderBoardProps {
  days: string[]
}

function HeaderBoard({ days }: HeaderBoardProps) {
  const isLast = (id: number) => id + 1 === days.length
  return (
    <>
      <GridItem />
      {days.map((day, id) => (
        <GridItem
          key={day}
          borderRight={!isLast(id) ? 'solid #CECECE 2px' : ''}
          textAlign='center'
          py='3'
        >
          <Text fontSize='16px' fontWeight='semibold' textColor='primary.100'>
            {day}
          </Text>
        </GridItem>
      ))}
    </>
  )
}

export default HeaderBoard
