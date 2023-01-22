import { Grid, Center, Text, HStack } from '@chakra-ui/react'
import { memo } from 'react'
import { BsListCheck } from 'react-icons/bs'

import { DAYS } from '../../constants'
import useAppContext from '../../hooks/useAppContext'
import rowBordList from '../../services/boardService'
import HeaderBoard from './HeaderBoard'
import RowBoard from './RowBoard'

function WeekBoard() {
  const { disciplinas } = useAppContext()
  const isEven = (num: number) => num % 2 === 0

  return (
    <Grid
      templateColumns='65px repeat(6, 1fr)'
      marginTop='28'
      position='relative'
    >
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
      {(!disciplinas || !disciplinas.some((d) => d.checked)) && (
        <Center
          height='full'
          width='full'
          position='absolute'
          left={0}
          top={0}
          textAlign='center'
        >
          <Text fontSize='xl' as='b' textColor='blackAlpha.700' mx='36'>
            Selecione as disciplinas que deseja clicando no botão do canto
            superior esquerdo.
          </Text>
        </Center>
      )}
    </Grid>
  )
}

export default memo(WeekBoard)
