'use client'

import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/app/store/store'

export default function Providers({ children }: { children: ReactNode[] | ReactNode | null }) {
	
	return (
		<Provider store={ store }>
			{ children }
		</Provider>
	)
}