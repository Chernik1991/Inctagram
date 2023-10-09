import { createApi } from '@reduxjs/toolkit/query/react'

import { BaseResponseType } from '@/src/services'
import { appActions } from '@/src/services/app'
import {
  AccessType,
  LoginArgsType,
  NewPasswordArgsType,
  PasswordRecoveryType,
  RegisterArgsType,
  UserType,
} from '@/src/services/auth/auth-api-types'
import { authActions } from '@/src/services/auth/auth-slice'
import { baseQueryWithReauth } from '@/src/services/base-query-with-reauth'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Me'],
  endpoints: builder => ({
    getMe: builder.query<BaseResponseType<UserType>, void>({
      query: () => 'auth/me',
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data.resultCode === 0) {
            dispatch(authActions.setIsAuth(true))
            dispatch(authActions.setUser(data.data))
          }
        } catch (e) {
          console.error(e)
        } finally {
          dispatch(appActions.setAppInitialized({ isInitialized: true }))
        }
      },
      providesTags: ['Me'],
      extraOptions: { maxRetries: false },
    }),
    loginUser: builder.mutation<BaseResponseType<AccessType>, LoginArgsType>({
      query: data => ({
        method: 'POST',
        url: 'auth/login',
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data.resultCode === 0) {
            localStorage.setItem('access', data.data.accessToken)
            dispatch(authApi.util.invalidateTags(['Me']))
            await dispatch(authApi.endpoints.getMe.initiate())
            // reQuery getMe, after login
          }
        } catch (e) {
          console.error(e)
        }
      },
    }),
    logoutUser: builder.mutation<BaseResponseType<AccessType>, void>({
      query: () => ({
        method: 'POST',
        url: 'auth/logout',
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data?.resultCode === 0) {
            localStorage.removeItem('access')
          }
        } catch (e) {
          console.error(e)
        }
      },
    }),
    register: builder.mutation<BaseResponseType, RegisterArgsType>({
      query: data => ({
        method: 'POST',
        url: 'auth/signup',
        body: data,
      }),
    }),
    createNewPassword: builder.mutation<BaseResponseType, NewPasswordArgsType>({
      query: data => ({
        method: 'POST',
        url: 'auth/new-password',
        body: data,
      }),
    }),
    passwordRecovery: builder.mutation<BaseResponseType, PasswordRecoveryType>({
      query: data => ({
        method: 'POST',
        url: 'auth/password-recovery',
        body: data,
      }),
    }),
    regConfirm: builder.mutation<BaseResponseType<AccessType>, { code: string }>({
      query: data => ({
        method: 'POST',
        url: 'auth/registration-confirmation',
        body: data,
      }),
    }),
  }),
})
export const {
  useRegisterMutation,
  useLoginUserMutation,
  usePasswordRecoveryMutation,
  useCreateNewPasswordMutation,
  useRegConfirmMutation,
  useLogoutUserMutation,
  useGetMeQuery,
} = authApi
