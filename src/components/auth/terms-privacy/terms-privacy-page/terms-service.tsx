'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Typography } from '../../../ui/typography'

import s from './style.module.scss'

import { useTranslate } from '@/src/assets/hooks'
import ImageArrow from '@/src/assets/images/rightArrow.png'
import { RouteNames } from '@/src/common/constants/route-names'
import { Header } from '@/src/components/layout/header/header'
import { Button } from '@/src/components/ui/button'

export const Terms = () => {
  const { t } = useTranslate()
  const router = useRouter()

  return (
    <div>
      <Header />
      <div className={s.main}>
        {/*RouteNames.SIGN_IN*/}
        <Typography variant={'regular14'} className={s.SignUp}>
          <Button
            as={'a'}
            className={s.btn}
            variant={'text'}
            onClick={() => router.push(RouteNames.SIGN_IN)}
          >
            <span className={s.arrow}>
              <Image className={s.img} src={ImageArrow} alt="arrow" />
              {t.auth.BackToSignUp}
            </span>
          </Button>
        </Typography>

        <div className={s.Text}>
          <Typography className={s.title} variant="h1">
            {t.auth.privacyAndTermsPages.titleOfTermsOfService}
          </Typography>
          <br />
          <div>
            {t.auth.privacyAndTermsPages.textOfTerms.split(/\n+/).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
