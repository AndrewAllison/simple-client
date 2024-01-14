import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/app/store/baseQuery'

export interface SignInInput {
	email: string;
	password: string;
	returnTo?: string | undefined;
}

export interface SignUpInput {
	email: string;
	password: string;
	name: string;
}

export interface SignInResponse {
	success: boolean;
	redirectUrl?: string;
}

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['UNAUTHORIZED', 'UNKNOWN_ERROR', 'Profile'],
	endpoints: (builder) => ({
		getUserProfile: builder.query<any, void>({
			query: () => `auth/profile`,
			providesTags: ['Profile'],
			extraOptions: {
				refetchOnFocus: true
			}
		}),
		signIn: builder.mutation<SignInResponse, SignInInput>({
			query: ({ returnTo, email, password }) => ({
				url: `auth/sign-in?returnTo=${ returnTo }`,
				method: 'POST',
				body: {
					email,
					password
				}
			}),
			invalidatesTags: (result) => (result ? ['UNAUTHORIZED'] : []),
		}),
		signUp: builder.mutation<SignInResponse, SignUpInput>({
			query: ({ name, email, password }) => ({
				url: `auth/sign-up`,
				method: 'POST',
				body: {
					email,
					name,
					password
				}
			}),
			invalidatesTags: (result) => (result ? ['UNAUTHORIZED'] : []),
		}),
		signOut: builder.mutation<any, void>({
			query: () => ({
				url: `auth/sign-out`,
				method: 'POST'
			})
		}),
		varifyEmail: builder.mutation({
			query: (token) => ({
				url: `/auth/verify-email`,
				method: 'POST',
				body: {
					token
				}
			}),
		}),
		forgotPassword: builder.mutation({
			query: ({ email }) => ({
				url: `/auth/forgot-password`,
				method: 'POST',
				body: {
					email
				}
			}),
		}),
		resetPassword: builder.mutation({
			query: ({ newPassword }) => ({
				url: `/auth/reset-password`,
				method: 'POST',
				body: {
					newPassword
				}
			}),
		}),
	})
})
export const {
	useGetUserProfileQuery,
	useSignInMutation,
	useSignOutMutation,
	useSignUpMutation,
	useVarifyEmailMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation
} = authApi
