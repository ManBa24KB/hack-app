import { createReducer } from '@reduxjs/toolkit'
import { updateRelate } from './actions'

const initialState = {
	relateData: {
        isRelate: true,
        originList: '',
        tokenAddress: ''
    }
}

export default createReducer(initialState, (builder) => {
	builder
		.addCase(updateRelate, (state, { payload: { isRelate, originList, tokenAddress } }) => {
            state.relateData.isRelate = isRelate
            state.relateData.originList = originList
            state.relateData.tokenAddress = tokenAddress
		})
})