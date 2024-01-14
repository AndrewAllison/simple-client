'use client'
import SigninForm from '@/components/SigninForm'
import LoginButton from '@/components/LoginButton'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SignIn = () => {
	return (
		<main
			className="flex min-h-screen justify-center md:flex-row flex-col items-center container">
			<div className="flex flex-col justify-center items-center basis-1/2 py-8 ">
				<Link href={ '/' }>
					<h1 className="text-6xl mb-4 gradient-text">Simple Client</h1>
				</Link>
				<Image
					className="bordered rounded-xl shadow-accent hover:scale-110 duration-700"
					src="/simple_client_logo.png" alt="simple-client"
					width="200"
					height="200"
				/>
			</div>
			<div className="flex flex-col justify-center items-center basis-1/2">
				<h2 className="text-3xl font-thin mb-8">Sign In</h2>
				<SigninForm/>
				<p>Don&apos;t have a an account? &nbsp;
					<Link href={ '/auth/sign-up' }>Sign up</Link>
				</p>
				<div className="divider mt-8">External Providers</div>
				<LoginButton/>
			</div>
		</main>
	)
}

export default SignIn