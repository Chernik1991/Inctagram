import React, { useEffect, useState } from 'react'

import { useCreateNewPasswordMutation } from '@/src/assets/api/auth'
import { useErrorToastHandler } from '@/src/assets/hooks/useErrorToastHandler'
import {
  CreateNewPassword,
  CreateNewPasswordType,
} from '@/src/components/ui/createNewPassword/CreateNewPassword'
import { Header } from '@/src/components/ui/Header/Header'
import { Modal } from '@/src/components/ui/modals/BaseModal'
import { Typography } from '@/src/components/ui/typography'
import { NextPageWithLayout } from '@/src/pages/_app'
import {useRouter} from "next/router";

const CreateNewPasswordPage: NextPageWithLayout = () => {
  const [passwordSentModal, setPasswordSentModal] = useState<boolean>(false)

  const [createNewPassword, { isSuccess, isLoading, error }] = useCreateNewPasswordMutation()

  useErrorToastHandler(isSuccess, error)

  if (isLoading) return <p>Loading...</p>

  const router = useRouter()

  const submit = (data: CreateNewPasswordType) => {
    setPasswordSentModal(true)
    createNewPassword({ newPassword: data.password, recoveryCode: router.pathname })
  }

  useEffect(() => {
    if (isSuccess) {
      setPasswordSentModal(true)
    }
  }, [isSuccess])

  const onModalClose = () => {
    setPasswordSentModal(false)
  }
  const onSaveModalAction = () => {
    setPasswordSentModal(false)
  }

  return (
    <div
    // TODO styles
    // className={s.container}
    >
      {!passwordSentModal && <Header />}
      <div
      // className={s.main}
      >
        <CreateNewPassword onSubmitHandler={submit} />
        <Modal
          modalWidth={'sm'}
          title={'New password was created'}
          open={passwordSentModal}
          actionButtonName={'OK'}
          onClose={onModalClose}
          onAction={onSaveModalAction}
        >
          <Typography variant={'regular16'}>Your password was successfully changed</Typography>
        </Modal>
      </div>
    </div>
  )
}

export default CreateNewPasswordPage
