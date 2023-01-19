import { Grid } from '@chakra-ui/react'
import { memo } from 'react'

import { DAYS } from '../../constants'
import useAppContext from '../../hooks/useAppContext'
import rowBordList from '../../services/boardService'
import HeaderBoard from './HeaderBoard'
import RowBoard from './RowBoard'

function WeekBoard() {
  const { disciplinas } = useAppContext()
  const isEven = (num: number) => num % 2 === 0

  return (
    <Grid templateColumns='65px repeat(6, 1fr)' marginTop='28'>
      <HeaderBoard days={DAYS} />
      {rowBordList(disciplinas).map(
        ({ horario, disciplinas: disciplinasList }, id) => (
          <RowBoard
            key={`${horario.inicio}-${horario.fim}`}
            hour={horario}
            days={DAYS}
            disciplinas={disciplinasList}
            colored={isEven(id)}
          />
        ),
      )}
    </Grid>
  )
}

export default memo(WeekBoard)
