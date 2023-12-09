import { createReducer } from '@reduxjs/toolkit'
import { changeChain } from './actions'
import { getValueByUrlParams } from '@/utils'
const chainName: string = getValueByUrlParams('network')

const initialState = {
    chainName: chainName ? chainName : 'eth'
}

export default createReducer(initialState, (builder) => {
	builder
        .addCase(changeChain, (state:any, {payload:{ chainName } }) => {
            state.chainName = chainName
            localStorage.setItem('chain', chainName)
        })
})