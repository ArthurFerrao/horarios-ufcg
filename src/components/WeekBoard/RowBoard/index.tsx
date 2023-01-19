import { GridItem, Text, VStack, Divider } from '@chakra-ui/react'
import React from 'react'

import { DAYS_MAP } from '../../../constants'
import DisciplinaTag from '../DisciplinaTag'

interface RowBoardProps {
  hour: hora
  days: string[]
  colored?: boolean
  disciplinas: Disciplina[]
}

function RowBoard({ hour, days, colored, disciplinas }: RowBoardProps) {
  const backGroundColor = colored ? 'blackAlpha.100' : ''

  const isLast = (id: number) => id + 1 === days.length

  const getDisciplinaByDay = (day: string) =>
    disciplinas.filter((disciplina) =>
      disciplina.horario.some(
        (h) => DAYS_MAP[h.dia] === day && h.id === hour.id,
      ),
    )

  const formatHour = (hourStr: string) => {
    const [h, m] = hourStr.split(':')
    let str = `${h}h`
    str += m !== '00' ? `${m}m` : ''

    return str
  }

  return (
    <>
      <GridItem bg={backGroundColor} textAlign='center' py='2'>
        <VStack h='full' justifyContent='space-between'>
          <Text color='primary.400' fontWeight='semibold'>
            {formatHour(hour.inicio)}
          </Text>
          <Divider
            orientation='vertical'
            border='1px solid'
            borderColor='primary.400'
            opacity='1'
          />
          <Text color='primary.400' fontWeight='semibold'>
            {formatHour(hour.fim)}
          </Text>
        </VStack>
      </GridItem>
      {days.map((day, id) => (
        <GridItem
          key={day}
          bg={backGroundColor}
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

export default RowBoard
