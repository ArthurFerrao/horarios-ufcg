import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  HStack,
  ModalHeader,
  Link,
  Tag,
} from '@chakra-ui/react'
import React, { useRef, ChangeEvent } from 'react'
import { BiImport } from 'react-icons/bi'

import useAppContext from '../../hooks/useAppContext'
import getData from '../../services/disciplinasHandler'

interface ImportModalProps {
  isOpen: boolean
  onClose: () => void
}

function ImportModal({ isOpen, onClose }: ImportModalProps) {
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
        getData(data).then((result) => {
          updateDisciplinas(result.disciplinas)
          onClose()
        })
      }
      e.target.value = ''
    }

    reader.readAsArrayBuffer(file)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='2xl' isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody
          textAlign='center'
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          <Text fontSize='2xl' as='b' textColor='blackAlpha.800'>
            Para começar, baixe o pdf gerado na págiana{' '}
            <Link
              href='https://pre.ufcg.edu.br:8443/ControleAcademicoOnline/Controlador?command=AlunoDisciplinasOfertadas'
              isExternal
              display='inline-block'
              bg='blackAlpha.200'
              px='2'
              borderRadius='5px'
            >
              turmas ofertadas <ExternalLinkIcon mx='2px' />
            </Link>{' '}
            do Controle Academico.
          </Text>
          <Text fontSize='2xl' as='b' textColor='blackAlpha.800'>
            Em seguida importe o pfd clicando no botão abaixo.
          </Text>
          <input
            ref={fileInput}
            accept='.pdf'
            type='file'
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />
          <Button
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
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

export default ImportModal
