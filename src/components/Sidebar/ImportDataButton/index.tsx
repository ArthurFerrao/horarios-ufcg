import { Button, Text, HStack } from '@chakra-ui/react'
import React from 'react'
import { BiImport } from 'react-icons/bi'

interface ImportDataButtonPorps {
  onOpenModal: () => void
}

function ImportDataButton({ onOpenModal }: ImportDataButtonPorps) {
  return (
    <Button colorScheme='blackAlpha' variant='ghost' onClick={onOpenModal}>
      <HStack color='blackAlpha.900'>
        <BiImport />
        <Text>Importar dados</Text>
      </HStack>
    </Button>
  )
}

export default ImportDataButton
