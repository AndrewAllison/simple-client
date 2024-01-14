'use client'
import React from 'react'
import SignUpForm from '@/components/SignUpForm'
import Link from 'next/link'

const SignUpPage = () => {
	return (
		<main
			className="flex min-h-screen justify-center gap-y-8 md:flex-col justify-items-center mx-auto items-center container">
			<h1 className="text-4xl font-thin">Sign Up</h1>
			<SignUpForm />
			<p>Already have an account? &nbsp;<Link href={'/auth/sign-in'}>Sign in</Link></p>
		</main>
	)
}

export default SignUpPage