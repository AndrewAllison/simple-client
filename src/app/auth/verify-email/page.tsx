'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useVarifyEmailMutation } from '@/app/store/services/authApi'

const VerifyEmailPage = () => {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')
	const [validateEmail, { isLoading, isSuccess, isError }] = useVarifyEmailMutation();
	
	useEffect(() => {
		if (token) {
			validateEmail(token);
		}
	}, [token, validateEmail]);
	
	if (isLoading) return <div>Validating...</div>;
	if (isSuccess) return <div>Email validated successfully!</div>;
	if (isError) return <div>Failed to validate email.</div>;
	
	return <div>Waiting for validation...</div>;
}

export default VerifyEmailPage