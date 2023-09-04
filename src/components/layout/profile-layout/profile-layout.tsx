import { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import s from './profile-layout.module.scss'

import { Header } from '@/src/components/ui/header'

export const ProfileLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <div className={s.container}>
      <Header />
      <div className={s.main}>{children}</div>
    </div>
  )
}
