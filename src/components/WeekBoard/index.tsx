import { Grid } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { DAYS, HORARIOS_DEFAULT } from '../../constants'
import useAppContext from '../../hooks/useAppContext'
import HeaderBoard from './HeaderBoard'
import RowBoard from './RowBoard'

function WeekBoard() {
  const { getDisciplinasByHour, boardHours } = useAppContext()

  const isEven = (num: number) => num % 2 === 0

  const hourSort = (a: hora, b: hora) => {
    const inicioA = a.inicio.replace(':', '.')
    const inicioB = b.inicio.replace(':', '.')
    return parseFloat(inicioA) > parseFloat(inicioB) ? 1 : -1
  }

  const isHorarioDefault = (hour: hora) =>
    HORARIOS_DEFAULT.some((h) => h.id === hour.id)

  const getDisciplinasByHourMap = () =>
    boardHours.map((hour) => ({
      horario: hour,
      disciplinas: getDisciplinasByHour(hour, true),
    }))

  const getRowBordList = () =>
    getDisciplinasByHourMap()
      .sort((a, b) => hourSort(a.horario, b.horario))
      .filter(
        ({ horario, disciplinas }) =>
          disciplinas.length !== 0 || isHorarioDefault(horario),
      )

  return (
    <Grid templateColumns='65px repeat(6, 1fr)' marginTop='28'>
      <HeaderBoard days={DAYS} />
      {getRowBordList().map(({ horario, disciplinas }, id) => (
        <RowBoard
          key={`${horario.inicio}-${horario.fim}`}
          hour={horario}
          days={DAYS}
          disciplinas={disciplinas}
          colored={isEven(id)}
        />
      ))}
    </Grid>
  )
}

export default WeekBoard
