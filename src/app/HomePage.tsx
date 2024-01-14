import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
const HomePage = () => {
	const [isOpen, setIsOpen] = useState(false)
	return (<div className="flex  flex-col">
			<nav className="relative container mx-auto p-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-20">
						<Image src="/simple_client_logo.png" width={64} height={64} alt="Simple Client"/>
						<div className="hidden space-x-8 font-bold lg:flex">
							{/*<a href="#" className="text-grayishViolet hover:text-veryDarkViolet"*/}
							{/*>Features</a*/}
							{/*>*/}
							{/*<a href="#" className="text-grayishViolet hover:text-veryDarkViolet"*/}
							{/*>Pricing</a*/}
							{/*>*/}
							{/*<a href="#" className="text-grayishViolet hover:text-veryDarkViolet"*/}
							{/*>Resources</a*/}
							{/*>*/}
						</div>
					</div>
					
					<div
						className="hidden items-center space-x-6 font-bold text-grayishViolet lg:flex"
					>
						<Link href="/auth/sign-in" className="hover:text-veryDarkViolet">Sign In</Link>
						<Link
							href="/auth/sign-up"
							className="px-8 py-3 font-bold text-white bg-primary rounded-full hover:opacity-70"
						>Sign Up</Link
						>
					</div>
					
					<button
						id="menu-btn"
						className={ `block hamburger lg:hidden focus:outline-none ${ isOpen ? 'open' : '' }` }
						type="button"
						onClick={ () => {
							setIsOpen(!isOpen)
						} }
					>
						<span className="hamburger-top"></span>
						<span className="hamburger-middle"></span>
						<span className="hamburger-bottom"></span>
					</button>
				</div>
				
				<div
					id="menu"
					className={ `absolute p-6 rounded-lg bg-darkViolet left-6 right-6 top-20 z-100 ${ isOpen ? 'flex' : 'hidden' }` }
				>
					<div
						className="flex flex-col lg:hidden items-center justify-center w-full space-y-6 font-bold text-white rounded-sm"
					>
						<a href="/auth/sign-in" className="w-full pt-6 border-t border-gray-400 text-center"
						>Sign In</a
						>
						<a href="/auth/sign-up" className="w-full py-3 text-center rounded-full bg-cyan"
						>Sign Up</a
						>
					</div>
				</div>
			</nav>
			<div className="hero p-64">
					<h1 className="font-bold text-6xl">Welcome!!!</h1>
			</div>
		</div>
	)
}

export default HomePage