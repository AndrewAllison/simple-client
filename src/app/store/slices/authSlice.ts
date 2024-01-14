import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store/store'

export interface AuthState {
	profile?: any;
	isLoading: boolean;
	isAuthenticated?: boolean | undefined,
	error?: any;
}

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		profile: null,
		isLoading: false,
		error: null,
	} as AuthState,
	reducers: {
		setUserProfile: (state, action) => {
			state.profile = action.payload
		},
		setIsAuthenticated: (state, action: PayloadAction<{
			authenticated: boolean
		}>) => {
			const { authenticated } = action.payload
			state = { ...state, isAuthenticated: authenticated }
			return state
		}
	}
})

export const { setUserProfile, setIsAuthenticated } = authSlice.actions
export default authSlice.reducer

export const isUserAuthenticated = (state: RootState) => state.auth.isAuthenticated