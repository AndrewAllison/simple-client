import React from 'react'
import { useFormContext } from 'react-hook-form'

const FormControl = ({ name, label, type = 'text', placeholder = '' }: { name: string, label: string, type?: string, placeholder?: string }) => {
	const {
		register,
		formState: { errors }
	} = useFormContext()
	
	return (
		<div className="form-control mb-4">
			<label htmlFor={ name }>{ label }</label>
			<input
				id="name"
				className="input input-bordered w-full"
				autoComplete={name}
				placeholder={placeholder}
				type={type}
				{ ...register(name) } />
			{ errors[name] &&
        <p className={ 'text-sm text-red-500 italic' }>
					{ `${ errors[name]?.message }` }
        </p>
			}
		</div>)
}

export default FormControl