import React, { useState, useEffect, ReactNode } from 'react'

const ClientRenderGuard = ({ children }: { children: ReactNode }) => {
	const [isClient, setIsClient] = useState(false);
	
	useEffect(() => {
		setIsClient(true);
	}, []);
	
	return isClient ? children : <span className="loading loading-ring loading-md"></span>;
}

export default ClientRenderGuard;
