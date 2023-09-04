import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import s from './create-new-password.module.scss'

import { useCreateNewPasswordMutation } from '@/src/assets/api/auth'
import { useErrorToastHandler } from '@/src/assets/hooks/useErrorToastHandler'
import { PasswodsMatchFormType } from '@/src/common/schemas/passwordsMatch-schema'
import { CreateNewPassword } from '@/src/components/auth/create-new-password/CreateNewPassword'
import { Header } from '@/src/components/ui/header/header'
import { Modal } from '@/src/components/ui/modals/BaseModal'
import { Typography } from '@/src/components/ui/typography'
import { NextPageWithLayout } from '@/src/pages/_app'

const CreateNewPasswordPage: NextPageWithLayout = () => {
  const [passwordSentModal, setPasswordSentModal] = useState<boolean>(false)

  const [createNewPassword, { isSuccess, isLoading, error }] = useCreateNewPasswordMutation()

  useErrorToastHandler(isSuccess, error)

  if (isLoading) return <p>Loading...</p>

  const router = useRouter()

  const submit = (data: PasswodsMatchFormType) => {
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
    <div className={s.container}>
      {!passwordSentModal && <Header />}
      <div className={s.main}>
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
