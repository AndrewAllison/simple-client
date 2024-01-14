import React, { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useSignUpMutation } from '@/app/store/services/authApi'
import { useAppDispatch } from '@/app/store/hooks'
import { setIsAuthenticated } from '@/app/store/slices/authSlice'
import PasswordInput from '@/components/PasswordInput/PasswordInput'
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator/PasswordStrengthIndicator'
import FormControl from '@/components/FormControl/FomrConrol'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'

interface FormData {
	email: string;
	name: string;
	password: string;
}

export const passwordRules =  z.string()
	.min(8, { message: 'Password must be at least 8 characters long' })
	.regex(/[A-Z]/, { message: 'Password must contain an uppercase letter' })
	.regex(/[a-z]/, { message: 'Password must contain a lowercase letter' })
	.regex(/[0-9]/, { message: 'Password must contain a number' })
	.regex(/[^A-Za-z0-9]/, { message: 'Password must contain a special character' })

const schema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	name: z.string().min(1, { message: 'name is required' }),
	password: passwordRules
})

const SignUpForm: React.FC = () => {
	const dispatch = useAppDispatch()
	const { replace } = useRouter()
	const [signUp] = useSignUpMutation()
	const [error, setError] = useState<string | null>(null)
	
	const methods = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: '',
			name: '',
			password: ''
		}
	})
	const {
		handleSubmit,
		watch,
		formState: { errors }
	} = methods
	
	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			const signUpResponse = await signUp({
				...data
			})
			if ('data' in signUpResponse) {
				try {
					dispatch(setIsAuthenticated({ authenticated: true }))
					replace(signUpResponse?.data?.redirectUrl || '/dashboard')
				} catch (e) {
					console.log('AUTH-FAILED', e)
				}
			}
			if ('error' in signUpResponse) {
				console.error('[SIGN-UP]:Error', signUpResponse)
				setError('Sign Up error')
			}
		} catch (error) {
			console.error('SignUp failed', error)
		}
	}
	
	return (<>
			<ErrorMessage
				error={error}
				message='Failed to authenticate. Check your username and password or contact support.'
			/>
			<FormProvider { ...methods }>
				<form className="w-full mx-auto" onSubmit={ handleSubmit(onSubmit) }>
					<FormControl
						name={ 'email' }
						label={ 'Email:' }
						placeholder={ 'Enter an email' }
					/>
					<FormControl
						name={ 'name' }
						label={ 'Name:' }
						placeholder={ 'Enter a name' }
					/>
					<PasswordInput
						autoComplete="new-password"
					/>
					<div className="mb-8">
						<PasswordStrengthIndicator password={ watch('password') }/>
					</div>
					
					<button
						aria-label="Sign Up"
						className="btn btn-primary"
						type="submit">Sign Up
					</button>
				</form>
			</FormProvider>
		</>
	)
}

export default SignUpForm
