import { ReactNode, useEffect } from 'react'
import { redirect, usePathname } from 'next/navigation'
import { useGetUserProfileQuery } from '@/app/store/services/authApi'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { setIsAuthenticated, setUserProfile } from '@/app/store/slices/authSlice'
import { element } from 'prop-types'

export type ProtectedProps = {
	children: ReactNode;
};

const EmailVerification = ({ profile }: { profile: any } ) => {
	if (profile.verified) {
		return null;
	} else {
		return <div role="alert" className="alert alert-warning">
			<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
			     viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
				      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
			</svg>
			<span>Warning: Email address is not verified!</span>
			<button className="btn btn-sm">Resend</button>
		</div>
	}
}

const Protected = ({ children }: ProtectedProps) => {
	const dispatch = useAppDispatch()
	const { data: profile, isLoading, error } = useGetUserProfileQuery()
	const { isAuthenticated } = useAppSelector((state) => state.auth)
	
	const pathName = usePathname()
	const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''
	const returnTo = `${ origin }${ pathName }`
	
	useEffect(() => {
		if (isAuthenticated === false) {
			return redirect(`/auth/sign-in?returnTo=${ returnTo }`)
		}
	}, [isAuthenticated])
	
	useEffect(() => {
		dispatch(setIsAuthenticated({ authenticated: true }))
		dispatch(setUserProfile(profile))
	}, [profile, dispatch])
	
	if (isLoading) {
		return (
			<div className="flex flex-col gap-6 min-h-screen justify-center items-center">
				<span className="loading loading-ring loading-lg"></span>
				<p>Loading.....</p>
			</div>
		)
	}
	
	if ((error as any)?.status === 401 && !isLoading) {
		//dispatch(setIsAuthenticated({ authenticated: false }))
		// dispatch(setUserProfile(null))
		// return redirect(`/auth/sign-in?returnTo=${returnTo}`)
	}
	
	return <div>
		<EmailVerification profile={profile} />
		{ children }
	</div>
}

export default Protected