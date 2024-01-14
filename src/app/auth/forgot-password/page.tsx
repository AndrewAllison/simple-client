'use client'
import { useSearchParams } from 'next/navigation'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import React, { useState } from 'react'
import { useForgotPasswordMutation } from '@/app/store/services/authApi'
import FormControl from '@/components/FormControl/FomrConrol'
import ClientRenderGuard from '@/components/ClientRenderGuard/ClientRenderGuard'

interface FormData {
	email: string;
}

const schema = z.object({
	email: z.string().email({ message: 'Invalid email address' })
})

const ForgotPassword = () => {
	const params = useSearchParams()
	const email = params.get('email')
	const [forgotPassword] = useForgotPasswordMutation()
	const [error, setError] = useState<string | null>(null)
	
	const methods = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: email ?? ''
		}
	})
	const {
		handleSubmit,
		formState: { errors }
	} = methods
	
	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			const forgotPasswordResponse = await forgotPassword({
				...data
			})
			if ('data' in forgotPasswordResponse) {
				try {
					// dispatch(setIsAuthenticated({ authenticated: true }))
					// replace(signUpResponse?.data?.redirectUrl || '/dashboard')
				} catch (e) {
					console.log('EMAIL-FAILED', e)
				}
			}
			if ('error' in forgotPasswordResponse) {
				console.error('[FORGOT-PASSWORD]:Error', forgotPasswordResponse)
				setError('Error sending forgot password request.')
			}
		} catch (error) {
			console.error('Forgot Email failed', error)
		}
	}
	
	return (<div>
		<ClientRenderGuard>
			<h1>Forgot Password</h1>
			<ErrorMessage
				error={ error }
			/>
			<FormProvider { ...methods }>
				<form className="w-full mx-auto" onSubmit={ handleSubmit(onSubmit) }>
					<FormControl
						name={ 'email' }
						label={ 'Email:' }
						placeholder={ 'Enter an email' }
					/>
					<button
						aria-label="Forgot Password"
						className="btn btn-primary"
						type="submit">Forgot Password
					</button>
				</form>
			</FormProvider>
		</ClientRenderGuard>
	
	</div>)
}

export default ForgotPassword