import { createReducer } from '@reduxjs/toolkit'
import { setLoadingState, setAddNodeLoadingState, setGlobleLoadingState, setLoginModalLoadingState, setShowStepModalState } from './actions'

const initialState = {
	isLoading: false,
	isAddNodeLoading: false,
	isGlobleLoading: false,
	isShowLoginModal: false,
	isShowStepModal: false
}

export default createReducer(initialState, (builder) => {
	builder
		.addCase(setLoadingState, (state, { payload: { isLoading } }) => {
            state.isLoading = isLoading
		})
		.addCase(setAddNodeLoadingState, (state, { payload: { isLoading } }) => {
            state.isAddNodeLoading = isLoading
		})
		.addCase(setGlobleLoadingState, (state, { payload: { isLoading } }) => {
            state.isGlobleLoading = isLoading
		})
		.addCase(setLoginModalLoadingState, (state, { payload: { isLoading } }) => {
            state.isShowLoginModal = isLoading
		})
		.addCase(setShowStepModalState, (state, { payload: { isShowStepModal } }) => {
            state.isShowStepModal = isShowStepModal
		})
})