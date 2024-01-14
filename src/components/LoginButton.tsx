'use client'
import React from 'react'

const LoginButton = () => {
	
	return (<>
			<a
				className="btn btn-social flex items-center justify-center border border-gray-300 rounded-xl rounded m-4 p-2 w-full"
				href={ `https://localhost:6006/auth/github?returnTo=https://localhost:3000/dashboard` }
			>
				<img className="w-9" src="/github.png" alt="Github login button"/>
				<span>Github</span>
			</a>
		</>
	
	)
}

export default LoginButton