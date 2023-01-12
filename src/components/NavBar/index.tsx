import { Button, Grid, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { BsListCheck } from 'react-icons/bs'

interface NavBarProps {
  openSidebar: () => void
}

function NavBar({ openSidebar }: NavBarProps) {
  return (
    <Grid bgColor='#521782' templateColumns='4rem 1fr 4rem' textAlign='center'>
      <Button
        bgColor='#421268'
        _hover={{ bg: '#471271' }}
        _active={{ bg: '#471271' }}
        borderRadius={0}
        height='auto'
        onClick={openSidebar}
      >
        <BsListCheck color='#FFF' size='2.4rem' />
      </Button>
      <Heading size='lg' fontWeight='medium' color='#E8E8E8' m={2}>
        Horários
        <Text display='inline' fontWeight='light'>
          UFCG
        </Text>
      </Heading>
    </Grid>
  )
}

export default NavBar
