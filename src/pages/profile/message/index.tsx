import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { getProfileLayout } from 'src/widgets/layout/profileLayout'
import { authIsAuthSelector } from 'src/features/auth/authService'
import { Message } from 'src/features/message'
import { useAppSelector } from '@/src/shared/hooks'
import { NextPageWithLayout } from '@/src/shared/service/types'
import { RouteNames } from 'src/shared/const/routeNames'

const MessagesPage: NextPageWithLayout = () => {
  const isAuth = useAppSelector(authIsAuthSelector)

  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push(RouteNames.SIGN_IN)
    }
  }, [isAuth, router])

  return isAuth && <Message />
}

MessagesPage.getLayout = getProfileLayout
export default MessagesPage
