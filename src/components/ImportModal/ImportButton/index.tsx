import { Button, Text, HStack, useToast } from '@chakra-ui/react'
import React, { useRef, ChangeEvent, useState } from 'react'
import { BiImport } from 'react-icons/bi'

import useAppContext from '../../../hooks/useAppContext'
import getData from '../../../services/turmasOfertadasService'

interface ImportButtonPorps {
  onCloseModal: () => void
}

function ImportButton({ onCloseModal }: ImportButtonPorps) {
  const [isLoadingPdf, setIsLoadingPdf] = useState(false)
  const { updateDisciplinas } = useAppContext()
  const fileInput = useRef<HTMLInputElement>(null)
  const toast = useToast()

  const toastError = () =>
    toast({
      title: 'Erro ao importar pdf',
      status: 'error',
      isClosable: true,
    })
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      return
    }
    const reader = new FileReader()
    const file = e.target.files[0]

    reader.onloadend = (fileResult) => {
      const data = fileResult.target?.result

      if (data) {
        setIsLoadingPdf(true)
        getData(data)
          .then((result) => {
            updateDisciplinas(result.disciplinas)
            setIsLoadingPdf(false)
            onCloseModal()
          })
          .catch((err) => {
            setIsLoadingPdf(false)
            toastError()
          })
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
        isLoading={isLoadingPdf}
        loadingText='Carregando'
        my='10'
        size='lg'
        colorScheme='blackAlpha'
        variant='ghost'
        onClick={() => fileInput.current && fileInput.current.click()}
      >
        <HStack color='blackAlpha.900'>
          <BiImport />
          <Text fontSize='xl'>Importar PDF</Text>
        </HStack>
      </Button>
    </>
  )
}

export default ImportButton
