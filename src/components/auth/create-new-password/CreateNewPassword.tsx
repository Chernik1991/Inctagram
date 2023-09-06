import React, { useEffect } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { useTranslate } from '@/src/assets/hooks/useTranslate'
import { FormFields, triggerZodFieldError } from '@/src/common/helpers/updateZodError'
import {
  PasswodsMatchFormType,
  passwordsMatchSchema,
} from '@/src/common/schemas/passwordsMatch-schema'
import s from '@/src/components/auth/create-new-password/createNewPassword.module.scss'
import { Button } from '@/src/components/ui/button'
import { ControlledTextField } from '@/src/components/ui/controlled'
import { Typography } from '@/src/components/ui/typography'

type CreateNewPasswordPropsType = {
  onSubmitHandler: (data: PasswodsMatchFormType) => void
}

export const CreateNewPassword = ({ onSubmitHandler }: CreateNewPasswordPropsType) => {
  const { t } = useTranslate()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState,
    trigger,
    formState: { touchedFields, errors },
  } = useForm<PasswodsMatchFormType>({
    resolver: zodResolver(passwordsMatchSchema(t)),
    mode: 'onTouched',
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  })

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
    // TODO:  it works ! but need to replace this handler (not a good one)
  }, [t])

  const onSubmit = handleSubmit((data: PasswodsMatchFormType) => {
    onSubmitHandler(data)
  })

  return (
    <form className={s.wrapper} onSubmit={onSubmit}>
      <Typography variant={'h1'}>{t.auth.createNewPassword}</Typography>
      <DevTool control={control} />

      <ControlledTextField
        control={control}
        name={'password'}
        type={'password'}
        label={t.auth.newPassword}
        className={s.password}
      />

      <ControlledTextField
        control={control}
        name={'passwordConfirm'}
        type={'password'}
        label={t.auth.passwordConfirmation}
        className={`${s.password} ${errors.passwordConfirm && s.fieldWithError}`}
      />
      <div className={s.text}>
        <Typography variant="medium14" className={s.passwordRequirement}>
          {t.auth.passwordCharacters}
        </Typography>
      </div>
      <Button type={'submit'} variant="primary" fullWidth={true} className={s.btn}>
        <Typography variant="bold16">{t.auth.createNewPassword}</Typography>
      </Button>
    </form>
  )
}
