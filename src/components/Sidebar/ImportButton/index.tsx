import { Button, Text, HStack } from '@chakra-ui/react'
import React from 'react'
import { BiImport } from 'react-icons/bi'

function ImportButton() {
  return (
    <Button colorScheme='blackAlpha' variant='ghost'>
      <HStack color='blackAlpha.900'>
        <BiImport />
        <Text>Importar disciplinas</Text>
      </HStack>
    </Button>
  )
}

export default ImportButton
