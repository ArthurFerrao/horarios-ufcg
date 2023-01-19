import { Button, Text, HStack } from '@chakra-ui/react'
import React, { useRef, ChangeEvent } from 'react'
import { BiImport } from 'react-icons/bi'

import useAppContext from '../../../hooks/useAppContext'
import getData from '../../../services/disciplinasHandler'

function ImportButton() {
  const { updateDisciplinas } = useAppContext()
  const fileInput = useRef<HTMLInputElement>(null)
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      return
    }
    const reader = new FileReader()
    const file = e.target.files[0]

    reader.onloadend = (fileResult) => {
      const data = fileResult.target?.result

      if (data) {
        getData(data).then((result) => updateDisciplinas(result.disciplinas))
      }
      e.target.value = ''
    }

    reader.readAsArrayBuffer(file)
  }
  return (
    <>
      <input
        ref={fileInput}
        accept='.pdf'
        type='file'
        onChange={handleFileInput}
        style={{ display: 'none' }}
      />
      <Button
        colorScheme='blackAlpha'
        variant='ghost'
        onClick={() => fileInput.current && fileInput.current.click()}
      >
        <HStack color='blackAlpha.900'>
          <BiImport />
          <Text>Importar disciplinas</Text>
        </HStack>
      </Button>
    </>
  )
}

export default ImportButton
