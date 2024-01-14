'use client'
import { useSelector } from 'react-redux'
import { setIsAuthenticated } from '@/app/store/slices/authSlice'
import { useAppDispatch } from '@/app/store/hooks'
import axios from 'axios'
import Protected from '@/components/Protected'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CountDownClock from '@/components/CountDownClock'
import { addSeconds } from 'date-fns'
import withAuth from '@/app/store/withAuth'

export interface State {
	auth: {
		profile: any;
		isAuthenticated: boolean;
	}
}

const Dashboard = () => {
	const { push } = useRouter()
	const dispatch = useAppDispatch()
	const authDetails = useSelector((state: State) => state.auth)
	
	const handleLogoutClicked = () => {
		axios
			.post('https://localhost:6006/auth/sign-out', {}, { withCredentials: true })
			.then(() => {
				dispatch(setIsAuthenticated({ authenticated: false }))
				push('/auth/sign-in')
			})
	}
	
	return <Protected>
		<h1>Dashboard</h1>
		<h2>Refresh Token expires in</h2>
		<CountDownClock targetDate={ addSeconds(new Date(), 10) }/>
		<h2>Access Token expires in</h2>
		<CountDownClock targetDate={ addSeconds(new Date(), 60) }/>
		<pre>{ JSON.stringify(authDetails, null, 2) }</pre>
		<Link href={ 'auth/sign-in' }>Sign In</Link>
		<Link href={ '/' }>Home</Link>
		<br/>
		<button onClick={ handleLogoutClicked }>LOG OUT!!</button>
	</Protected>
}

export default Dashboard