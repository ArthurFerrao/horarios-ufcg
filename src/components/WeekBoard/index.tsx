import { Grid } from '@chakra-ui/react'
import React from 'react'

import { DAYS } from '../../constants'
import useAppContext from '../../hooks/useAppContext'
import HeaderBoard from './HeaderBoard'
import RowBoard from './RowBoard'

function WeekBoard() {
  const { getHours } = useAppContext()

  const hours = getHours()
  const isEven = (num: number) => num % 2 === 0

  const hourSort = (a: hora, b: hora) => {
    const inicioA = a.inicio.replace(':', '.')
    const inicioB = b.inicio.replace(':', '.')
    return parseFloat(inicioA) > parseFloat(inicioB) ? 1 : -1
  }

  return (
    <Grid templateColumns='65px repeat(5, 1fr)' marginTop='28'>
      <HeaderBoard days={DAYS} />
      {hours.sort(hourSort).map((hour, id) => (
        <RowBoard
          key={`${hour.inicio}-${hour.fim}`}
          hour={hour}
          days={DAYS}
          colored={isEven(id)}
        />
      ))}
    </Grid>
  )
}

export default WeekBoard
