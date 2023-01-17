import { Grid } from '@chakra-ui/react'
import React from 'react'

import { DAYS, HORARIOS_DEFAULT } from '../../constants'
import useAppContext from '../../hooks/useAppContext'
import HeaderBoard from './HeaderBoard'
import RowBoard from './RowBoard'

function WeekBoard() {
  const { getHours, getDisciplinasByHour } = useAppContext()

  const isEven = (num: number) => num % 2 === 0

  const hourSort = (a: hora, b: hora) => {
    const inicioA = a.inicio.replace(':', '.')
    const inicioB = b.inicio.replace(':', '.')
    return parseFloat(inicioA) > parseFloat(inicioB) ? 1 : -1
  }

  const isHorarioDefault = (hour: hora) =>
    HORARIOS_DEFAULT.some((h) => h.id === hour.id)

  const getRowBordList = () => {
    const hours = getHours()
    const list: JSX.Element[] = []
    let contRows = 0

    hours.sort(hourSort).forEach((hour) => {
      const disciplinas = getDisciplinasByHour(hour, true)
      if (disciplinas.length !== 0 || isHorarioDefault(hour)) {
        list.push(
          <RowBoard
            key={`${hour.inicio}-${hour.fim}`}
            hour={hour}
            days={DAYS}
            disciplinas={disciplinas}
            colored={isEven(contRows)}
          />,
        )
        contRows++
      }
    })

    return list
  }

  return (
    <Grid templateColumns='65px repeat(5, 1fr)' marginTop='28'>
      <HeaderBoard days={DAYS} />
      {getRowBordList()}
    </Grid>
  )
}

export default WeekBoard
