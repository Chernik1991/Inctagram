import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { RouteNames } from '@/src/common/constants/route-names'
import { getProfileLayout } from '@/src/components/layout/profile-layout'
import { MenuContainer } from '@/src/components/profile/menu-container'
import s from '@/src/components/profile/profile.module.scss'
import { Typography } from '@/src/components/ui/typography'
import { NextPageWithLayout } from '@/src/pages/_app'
import { useAppSelector } from '@/src/services'
import { authIsAuthSelector } from '@/src/services/auth'

const MessagesPage: NextPageWithLayout = () => {
  const isAuth = useAppSelector(authIsAuthSelector)

  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push(RouteNames.SIGN_IN)
    }
  }, [isAuth, router])

  return (
    isAuth && (
      <div className={s.container}>
        <MenuContainer />
        <div className={s.containerInfo}>
          <Typography>Message</Typography>
        </div>
      </div>
    )
  )
}

MessagesPage.getLayout = getProfileLayout
export default MessagesPage
