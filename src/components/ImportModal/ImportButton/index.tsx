import { Button, Text, HStack, useToast } from '@chakra-ui/react'
import React, { useRef, ChangeEvent, useState } from 'react'
import { BiImport } from 'react-icons/bi'

import useAppContext from '../../../hooks/useAppContext'
import getData from '../../../services/turmasOfertadasService'

interface ImportButtonPorps {
  onCloseModal: () => void
}

type statusType =
  | 'info'
  | 'warning'
  | 'success'
  | 'error'
  | 'loading'
  | undefined

function ImportButton({ onCloseModal }: ImportButtonPorps) {
  const [isLoadingPdf, setIsLoadingPdf] = useState(false)
  const { updateDisciplinas } = useAppContext()
  const fileInput = useRef<HTMLInputElement>(null)
  const toast = useToast()

  const toastError = (title: string, status: statusType) =>
    toast({
      title,
      status,
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
            toastError('Pdf importado com sucesso', 'success')
            setIsLoadingPdf(false)
            onCloseModal()
          })
          .catch(() => {
            setIsLoadingPdf(false)
            toastError('Erro ao importar pdf', 'error')
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
        mt='10'
        mb='4'
        size='lg'
        colorScheme='blackAlpha'
        variant='ghost'
        onClick={() => fileInput.current && fileInput.current.click()}
        borderRight='solid 1px'
        borderBottom='solid 1px'
        borderColor='blackAlpha.300'
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
