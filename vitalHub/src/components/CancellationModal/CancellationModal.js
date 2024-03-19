import { useEffect, useState } from 'react'
import { ButtonModal, ButtonSecondary } from '../Button/Style'
import { ButtonTitle, ButtonSecondaryTitle } from '../ButtonTitle/Style'
import { Title } from '../Title/Style'
import * as Notifications from "expo-notifications";

import { PatientModal, ModalContent, ModalText } from './Style'
import { Modal } from 'react-native'

Notifications.requestPermissionsAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,

    shouldPlaySound: true,

    shouldSetBadge: false,
  })
})



const CancellationModal = ({visible, setShowModalCancelar, ...rest}) => {  
  return (
    <Modal {...rest} visible={visible} transparent={true} animationType='fade'>
      <PatientModal>
        <ModalContent>
          <Title>Cancelar consulta</Title>

          <ModalText>Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário,
            deseja mesmo cancelar essa consulta?</ModalText>

            <ButtonModal>
              <ButtonTitle>Confirmar</ButtonTitle>
            </ButtonModal>

            <ButtonSecondary onPress={ () => setShowModalCancelar(false)}>
              <ButtonSecondaryTitle>
                Cancelar
              </ButtonSecondaryTitle>
            </ButtonSecondary>
        </ModalContent>
      </PatientModal>
    </Modal>
  )
}

export default CancellationModal