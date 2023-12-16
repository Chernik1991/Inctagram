import { GetUserPostResponse, GetUserPostsResponse } from './postApiTypes'

import { baseApi, BaseResponse } from '@/src/shared/api'

const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addPost: builder.mutation<BaseResponse, FormData>({
      query: body => ({
        method: 'POST',
        url: `posts/create`,
        body,
      }),
      invalidatesTags: ['Post', 'Profile'],
    }),
    getUserPosts: builder.query<
      BaseResponse<GetUserPostsResponse>,
      {
        userId: string
        sortDirection?: string
        pageNumber?: number
        pageSize?: number
      }
    >({
      query: arg => ({
        url: `posts/${arg.userId}?sortDirection=${arg.sortDirection || 'asc'}&pageNumber=${
          arg.pageNumber || 1
        }&pageSize=${arg.pageSize || 10}`,
        method: 'GET',
      }),
      providesTags: ['Post'],
    }),
    getUserPost: builder.query<BaseResponse<GetUserPostResponse>, string | null>({
      query: postId => ({
        url: `posts/post/${postId}`,
        method: 'GET',
      }),
      providesTags: ['Post'],
    }),
  }),
})

export const {
  useAddPostMutation,
  useGetUserPostsQuery,
  useGetUserPostQuery,
  util: { getRunningQueriesThunk },
} = postApi

export const { getUserPosts, getUserPost } = postApi.endpoints
