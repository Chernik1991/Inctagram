import React, { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'
import { ControlledTextField } from '../../ui/controlled'
import { Typography } from '../../ui/typography'

import s from './login-form.module.scss'

import { useTranslation } from '@/src/assets/hooks/useTranslation'
import GithubIcon from '@/src/assets/icons/github-icon'
import GoogleIcon from '@/src/assets/icons/google-icon'
import { logInSchema } from '@/src/common/schemas/logIn-schema'
import { Card } from '@/src/components/ui/card-temporary'

type FormDataType = z.infer<typeof logInSchema>
type LoginType = {
  onSubmitHandler: (data: FormDataType) => void
}
export const LoginForm: FC<LoginType> = ({ onSubmitHandler }) => {
  const { t } = useTranslation()

  const { control, handleSubmit } = useForm<FormDataType>({
    resolver: zodResolver(logInSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const router = useRouter()

  const submitData = (data: FormDataType) => {
    onSubmitHandler(data)
  }

  return (
    <Card className={s.card}>
      <div className={s.content}>
        <Typography variant="h1" className={s.title}>
          {t.auth.signIn}
        </Typography>
        <div className={s.oauthWrap}>
          <Link href={'/google'}>
            <GoogleIcon />
          </Link>
          <Link href={'/github'}>
            <GithubIcon />
          </Link>
        </div>
        <form onSubmit={handleSubmit(submitData)} className={s.form}>
          <ControlledTextField
            control={control}
            name="email"
            label="Email"
            className={s.controlTextField}
            fullWidth
          />

          <ControlledTextField
            control={control}
            name="password"
            label="Password"
            type="password"
            className={s.controlTextField}
            fullWidth
          />
          <div className={s.wrapLinkForgotPass}>
            <Link href={'/auth/forgot-password'} className={s.link}>
              <Typography variant="medium14" className={s.linkForgotPass}>
                {t.auth.forgotPassword}
              </Typography>
            </Link>
          </div>
          <Button type="submit" variant="primary" fullWidth className={s.singIn}>
            <Typography variant="bold16">{t.auth.signIn}</Typography>
          </Button>
        </form>

        <Typography variant="regular16">{t.auth.dontHaveAccount}</Typography>
        <Button variant="link" color={'link'} onClick={() => router.push('/auth/sign-up')}>
          {t.auth.signUp}
        </Button>
        <Button onClick={() => router.push('/profile')}>Profile</Button>
      </div>
    </Card>
  )
}
