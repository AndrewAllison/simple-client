import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { setIsAuthenticated } from '@/app/store/slices/authSlice'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()
const baseQuery = fetchBaseQuery(
	{
		baseUrl: 'https://localhost:6006',
		credentials: 'include'
	})

const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	await mutex.waitForUnlock()
	let result = await baseQuery(args, api, extraOptions)
	if (result.error && result.error.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire()
			try {
				const refreshResult = await baseQuery('/auth/refresh-token', api, extraOptions)
				if (refreshResult.data) {
					api.dispatch(setIsAuthenticated({ authenticated: true, }))
					result = await baseQuery(args, api, extraOptions)
				} else {
					api.dispatch(setIsAuthenticated({ authenticated: false,  }))
				}
			} finally {
				release()
			}
		} else {
			await mutex.waitForUnlock()
			result = await baseQuery(args, api, extraOptions)
		}
	}
	return result
}

export { baseQueryWithReauth, baseQuery }