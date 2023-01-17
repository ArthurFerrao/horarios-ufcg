import { GridItem, Text } from '@chakra-ui/react'
import React from 'react'

import { DAYS_MAP, HORARIOS_DEFAULT } from '../../../constants'
import useAppContext from '../../../hooks/useAppContext'
import DisciplinaTag from '../DisciplinaTag'

interface RowBoardProps {
  hour: hora
  days: string[]
  colored?: boolean
}

function RowBoard({ hour, days, colored = false }: RowBoardProps) {
  const context = useAppContext()
  const disciplinas = context.getDisciplinasByHour(hour, true)
  const isLast = (id: number) => id + 1 === days.length

  const getDisciplinaByDay = (day: string) =>
    disciplinas.filter((disciplina) =>
      disciplina.horario.some(
        (h) =>
          DAYS_MAP[h.dia] === day &&
          h.inicio === hour.inicio &&
          h.fim === hour.fim,
      ),
    )

  const getBackGround = () => (colored ? 'blackAlpha.100' : '')

  const formatHour = (hourStr: string) => {
    const [h, m] = hourStr.split(':')
    let str = `${h}h`
    str += m !== '00' ? `${m}m` : ''

    return str
  }

  const isHorarioDefault = () =>
    HORARIOS_DEFAULT.some((h) => h.inicio === hour.inicio && h.fim === hour.fim)

  if (disciplinas.length === 0 && !isHorarioDefault()) {
    return null
  }

  return (
    <>
      <GridItem bg={getBackGround()} textAlign='center' py='2'>
        <Text color='primary.400' fontWeight='semibold'>
          {formatHour(hour.inicio)}
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

export default RowBoard
