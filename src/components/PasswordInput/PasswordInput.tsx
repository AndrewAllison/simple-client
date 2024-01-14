'use client'
import React, { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useFormContext } from 'react-hook-form' // assuming you use Heroicons for icons

export interface PasswordInputProps {
	autoComplete?: 'current-password' | 'new-password'
	controlName?: string
}

const PasswordInfo = () => {
	return (
		<div className="border border-info rounded-xl p-4">
			Password needs:
			<ul className="list-disc ml-8">
				<li>A minimum of 8 characters</li>
				<li>Include capital letters</li>
				<li>Include lowercase letters</li>
				<li>Include numbers</li>
				<li>Include special characters</li>
			</ul>
		</div>)
}

const PasswordInput = ({
	                       autoComplete = 'current-password',
	                       controlName = 'password'
                       }: PasswordInputProps) => {
	const {
		register,
		formState: { errors }
	} = useFormContext()
	const [showPassword, setShowPassword] = useState(false)
	
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}
	
	return (
		<div className="form-control w-full mb-4">
			<label htmlFor="password" className="label">
				<span className="label-text">Password:</span>
			</label>
			<div className="input-group relative w-full">
				<input
					id="password"
					autoComplete={ autoComplete }
					type={ showPassword ? 'text' : 'password' }
					placeholder="Enter password"
					className="input input-bordered w-full"
					{ ...register(controlName) }
				/>
				<div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
					<button
						aria-label={ showPassword ? 'Hide password' : 'Show password' }
						type="button"
						className="h5 w-5"
						onClick={ togglePasswordVisibility }
					>
						{ showPassword ?
							<EyeSlashIcon className="h-5 w-5"/> :
							<EyeIcon className="h-5 w-5"/>
						}
					</button>
					<span className="sr-only">
            { showPassword ? 'Hide password' : 'Show password' }
          </span>
				</div>
			</div>
			{ errors.password && <p className="text-sm text-red-500 italic">{ `${errors.password.message}` }</p> }
		</div>
	)
}

export default PasswordInput
