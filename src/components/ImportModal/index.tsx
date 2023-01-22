import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  ModalHeader,
  Link,
  Image,
} from '@chakra-ui/react'

import gif from '../../assets/turmasOfertadasPdf.gif'
import ImportButton from './ImportButton'

interface ImportModalProps {
  isOpenModal: boolean
  onCloseModal: () => void
}

function ImportModal({ isOpenModal, onCloseModal }: ImportModalProps) {
  return (
    <Modal isOpen={isOpenModal} onClose={onCloseModal} size='2xl' isCentered>
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
          <Text fontSize='2xl' as='b' textColor='blackAlpha.700'>
            Baixe o pdf gerado na págiana{' '}
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
            do Controle Acadêmico.
          </Text>
          <Image
            src={gif}
            alt='Download Turmas Ofertadas PDF'
            my='5'
            borderRadius='2xl'
          />
          <Text fontSize='2xl' as='b' textColor='blackAlpha.700'>
            Em seguida importe o pfd clicando no botão abaixo.
          </Text>
          <ImportButton onCloseModal={onCloseModal} />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

export default ImportModal
