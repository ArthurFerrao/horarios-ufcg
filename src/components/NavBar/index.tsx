import { Button, Grid, Heading, Text } from '@chakra-ui/react'
import { memo } from 'react'
import { BsListCheck } from 'react-icons/bs'

interface NavBarProps {
  openSidebar: () => void
}

function NavBar({ openSidebar }: NavBarProps) {
  return (
    <Grid
      bgColor='primary.400'
      templateColumns='4rem 1fr 4rem'
      textAlign='center'
    >
      <Button
        bgColor='primary.500'
        _hover={{ bg: 'primary.600' }}
        _active={{ bg: 'primary.600' }}
        borderRadius={0}
        height='auto'
        onClick={openSidebar}
      >
        <BsListCheck color='#FFF' size='2.4rem' />
      </Button>
      <Heading size='lg' fontWeight='medium' color='white' m={2}>
        Horários
        <Text display='inline' fontWeight='light'>
          UFCG
        </Text>
      </Heading>
    </Grid>
  )
}

export default memo(NavBar)
