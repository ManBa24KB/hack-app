import { createReducer } from '@reduxjs/toolkit'
import { userLogin, userLogout } from './actions'

const initialState = {
    token: localStorage.getItem('token') || ''
}

export default createReducer(initialState, (builder) => {
	builder
		.addCase(userLogin, (state, { payload: { token } }) => {
            state.token = token
            localStorage.setItem('token', token)
		})
        .addCase(userLogout, (state, { payload: { } }) => {
            state.token = ''
            localStorage.removeItem('token')
            localStorage.removeItem('chainName')
        })
})