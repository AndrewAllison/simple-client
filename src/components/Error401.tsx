// Error401.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

class Error401 extends Error {
	constructor() {
		super('Unauthorized');
		this.name = 'Error401';
	}
}

const Error401Component: React.FC = () => {
	const router = useRouter();
	
	useEffect(() => {
		// Redirect to the home page after 401 error
		router.replace('/auth/login');
	}, [router]);
	
	return null; // or display a loading spinner or custom message
};

export default Error401Component;