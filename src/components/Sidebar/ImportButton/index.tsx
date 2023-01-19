import { Button, Text, HStack, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { BiImport } from 'react-icons/bi'

import ImportModal from '../../ImportModal'

function ImportButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button colorScheme='blackAlpha' variant='ghost' onClick={onOpen}>
        <HStack color='blackAlpha.900'>
          <BiImport />
          <Text>Importar dados</Text>
        </HStack>
      </Button>

      <ImportModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default ImportButton
