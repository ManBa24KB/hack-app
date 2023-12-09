import { createReducer } from '@reduxjs/toolkit'
import { selectMainTokenType } from './actions'

const initialState = {
	mainTokenType: true
}

export default createReducer(initialState, (builder) => {
	builder
		.addCase(selectMainTokenType, (state, { payload: { mainTokenType } }) => {
            state.mainTokenType = mainTokenType
		})
})