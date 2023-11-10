import React from 'react'

import AvatarImage from '@/src/assets/images/avatar-image'
import { DataProfile } from '@/src/components/profile/profile-info/data-profile'
import s from '@/src/components/profile/profile-info/profile-info.module.scss'
import { useAppSelector } from '@/src/services'
import { useGetMeQuery } from '@/src/services/auth'
import { useGetProfileQuery } from '@/src/services/profile/profile-api'

export const ProfileInfo = () => {
  //const { userId } = useAppSelector(state => state.auth.user!)
  const { data: user } = useGetMeQuery()
  const id = user?.data?.userId
  const { data } = useGetProfileQuery(id)

  return (
    <div className={s.container}>
      {data?.data?.avatar && <img src={data?.data?.avatar} className={s.image} alt={'avatar'} />}
      {data?.data?.avatar && <AvatarImage className={s.image} />}
      <div className={s.dataProfile}>
        <DataProfile userData={data?.data} />
      </div>
    </div>
  )
}
