// SigninForm.tsx
import React, { useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSignInMutation } from '@/app/store/services/authApi'
import { useAppDispatch } from '@/app/store/hooks'
import { setIsAuthenticated } from '@/app/store/slices/authSlice'
import Link from 'next/link'
import PasswordInput from '@/components/PasswordInput/PasswordInput'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'

interface FormData {
	email: string;
	password: string;
	returnTo?: string | undefined;
}

const SigninForm: React.FC = () => {
	const dispatch = useAppDispatch()
	const { replace } = useRouter()
	const searchParams = useSearchParams()
	const [signIn] = useSignInMutation()
	const returnTo = searchParams.get('returnTo')
	const [error, setError] = useState<string | null>(null)
	
	const methods = useForm<FormData>({
		defaultValues: {
			email: '',
			password: '',
			returnTo: returnTo ?? '/'
		}
	})
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch
	} = methods
	const emailAddress = watch('email')
	
	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			const signInResponse = await signIn({
				...data
			})
			if ('data' in signInResponse) {
				try {
					console.log('[SIGN-IN]:Success', signInResponse)
					dispatch(setIsAuthenticated({ authenticated: true }))
					console.log(signInResponse.data.redirectUrl)
					replace(signInResponse?.data?.redirectUrl || '/dashboard')
				} catch (e) {
					console.log('AUTH-FAILED', e)
				}
			}
			if ('error' in signInResponse) {
				console.error('[SIGN-IN]:Error', signInResponse)
				setError('Nope you did not say the magic word')
			}
		} catch (error) {
			console.error('Login failed', error)
		}
	}
	
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		setIsClient(true);
	}, []);
	
	if (!isClient) return <span className="loading loading-ring loading-md"></span>
	
	return (<>
			<ErrorMessage error={error} />
			<FormProvider { ...methods }>
				<form className="w-full mx-auto" onSubmit={ handleSubmit(onSubmit) }>
				<label htmlFor="email">Email:</label>
				<input
					id="email"
					className="input input-bordered w-full mb-4"
					autoComplete="email"
					{ ...register('email', { required: 'Email is required' }) } />
				{ errors.email && <p>{ errors.email.message }</p> }
				
				<PasswordInput
					autoComplete="current-password"
				/>
				
				<button className="btn btn-primary" type="submit">Sign In</button>
				<div className="flex flex-col justify-center items-center flex-grow mt-4">
					<Link href={ `/auth/forgot-password?email=${ emailAddress }` }>Forgot Password</Link>
				</div>
			</form>
			</FormProvider>
		</>
	)
}

export default SigninForm
