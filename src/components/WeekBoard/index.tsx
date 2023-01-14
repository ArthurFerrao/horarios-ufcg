import { Grid } from '@chakra-ui/react'
import React from 'react'

import HeaderBoard from './HeaderBoard'
import RowBoard from './RowBoard'

function WeekBoard() {
  const hours = ['08', '10', '14', '16']
  const days = ['SEG', 'TER', 'QUA', 'QUI', 'SEX']
  const isEven = (num: number) => num % 2 === 0

  return (
    <Grid templateColumns='65px repeat(5, 1fr)' marginTop='36'>
      <HeaderBoard days={days} />
      {hours.map((hour, id) => (
        <RowBoard key={hour} hour={hour} days={days} colored={isEven(id)} />
      ))}
    </Grid>
  )
}

export default WeekBoard
