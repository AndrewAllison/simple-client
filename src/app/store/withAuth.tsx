import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { validateProfile } from '@/app/store/slices/authSlice'
import { redirect, usePathname } from 'next/navigation'

function withAuth(WrappedComponent: any) {
	function WithAuth(props: any) {
		const pathName = usePathname()
		const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''
		const returnTo = `${ origin }${ pathName }`
		
		useEffect(() => {
			if (!props.profile && !props.isLoading) {
				props.validateProfile();
			}
		}, [props.profile, props.isLoading, props.validateProfile]);
		
		useEffect(() => {
			if (props.error) {
				console.log('/auth/sign-in');
				redirect(`/auth/sign-in?returnTo=${returnTo}`)
			}
		}, [props.error]);
		
		if (props.isLoading) {
			return <div>Loading...</div>; // or any loading component
		}
		
		return <WrappedComponent {...props} />;
	}
	
	const mapStateToProps = (state: any) => ({
		profile: state.auth.profile,
		isLoading: state.auth.isLoading,
		error: state.auth.error,
	});
	
	const mapDispatchToProps = { validateProfile };
	
	return connect(mapStateToProps, mapDispatchToProps)(WithAuth);
}

export default withAuth;
