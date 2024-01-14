'use client'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import React, { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import PasswordInput from '@/components/PasswordInput/PasswordInput'
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator/PasswordStrengthIndicator'
import { passwordRules } from '@/components/SignUpForm'
import { useSearchParams } from 'next/navigation'
import { useResetPasswordMutation } from '@/app/store/services/authApi'
import ClientRenderGuard from '@/components/ClientRenderGuard/ClientRenderGuard'

interface FormData {
	token: string;
	newPassword: string;
}

const schema = z.object({
	token: z.string(),
	newPassword: passwordRules
})

const ResetPassword = () => {
	const params = useSearchParams()
	const token = params.get('token')
	const [error, setError] = useState<string | null>(null)
	const [resetPassword] = useResetPasswordMutation()
	
	const methods = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			token: token || ''
		}
	})
	const {
		handleSubmit,
		watch,
		register,
		formState: { errors }
	} = methods
	
	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			const resetPasswordResponse = await resetPassword({
				...data
			})
			if ('data' in resetPasswordResponse) {
				try {
					// dispatch(setIsAuthenticated({ authenticated: true }))
					// replace(signUpResponse?.data?.redirectUrl || '/dashboard')
				} catch (e) {
					console.log('EMAIL-FAILED', e)
				}
			}
			if ('error' in resetPasswordResponse) {
				console.error('[FORGOT-PASSWORD]:Error', resetPasswordResponse)
				setError('Error sending forgot password request.')
			}
		} catch (error) {
			console.error('Forgot Email failed', error)
		}
	}
	
	return (<>
		<ClientRenderGuard>
			<h1 className="text-4xl">Reset Password</h1>
			<ErrorMessage
				error={ error }
			/>
			<FormProvider { ...methods }>
				<form className="w-full mx-auto" onSubmit={ handleSubmit(onSubmit) }>
					<PasswordInput
						controlName="newPassword"
						autoComplete="new-password"
					/>
					<div className="mb-8">
						<PasswordStrengthIndicator password={ watch('newPassword') }/>
					</div>
					<button
						aria-label="Reset Password"
						className="btn btn-primary"
						type="submit">Reset Password
					</button>
				</form>
			</FormProvider>
		</ClientRenderGuard>
	</>)
}

export default ResetPassword