import { GridItem, Text } from '@chakra-ui/react'
import React from 'react'

import useAppContext from '../../../hooks/useAppContext'
import formatHour from '../../../utils/hourFormatter'
import DisciplinaTag from '../DisciplinaTag'

type daysMapType = {
  [key: string]: string
}
const DAYS_MAP: daysMapType = {
  '2': 'SEG',
  '3': 'TER',
  '4': 'QUA',
  '5': 'QUI',
  '6': 'SEX',
}

interface HeaderBoardProps {
  hour: string
  days: string[]
  colored?: boolean
}

function HeaderBoard({ hour, days, colored = false }: HeaderBoardProps) {
  const context = useAppContext()
  const disciplinas = context.getDisciplinasByHour(hour, true)
  const isLast = (id: number) => id + 1 === days.length

  const getDisciplinaByDay = (day: string) =>
    disciplinas.filter((disciplina) =>
      disciplina.horario.some(
        (h) => DAYS_MAP[h.dia] === day && formatHour(h.inicio) === hour,
      ),
    )

  const getBackGround = () => (colored ? 'blackAlpha.100' : '')

  return (
    <>
      <GridItem bg={getBackGround()} textAlign='center' py='2'>
        <Text color='primary.400' fontWeight='semibold'>
          {hour}h
        </Text>
      </GridItem>
      {days.map((day, id) => (
        <GridItem
          key={day}
          bg={getBackGround()}
          borderRight={!isLast(id) ? 'solid #CECECE 2px' : ''}
          p='2'
        >
          {getDisciplinaByDay(day).map((disciplina) => (
            <DisciplinaTag key={disciplina.id} disciplina={disciplina} />
          ))}
        </GridItem>
      ))}
    </>
  )
}

export default HeaderBoard
