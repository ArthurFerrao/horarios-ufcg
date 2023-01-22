import { Button } from '@chakra-ui/react'
import { FaEraser } from 'react-icons/fa'

import useAppContext from '../../../hooks/useAppContext'

const hover = {
  backgroundColor: 'primary.50',
  border: '2px solid',
  borderColor: 'primary.200',
  color: '#ffffff',
  transform: 'scale(1.04)',
  cursor: 'pointer',
}

interface BoardToolsProps {
  someMarked: boolean
}

function BoardTools({ someMarked }: BoardToolsProps) {
  const { setAllMarked } = useAppContext()
  return (
    <Button
      disabled={!someMarked}
      border='solid 2px #CECECE'
      size='sm'
      mr='2'
      p='0'
      bg={someMarked ? 'primary.300' : '#E1DFDF'}
      borderColor={someMarked ? 'primary.500' : '#CECECE'}
      _hover={someMarked ? hover : undefined}
      onClick={() => {
        setAllMarked(false)
      }}
    >
      <FaEraser size='1rem' color='#FFF' />
    </Button>
  )
}

export default BoardTools
