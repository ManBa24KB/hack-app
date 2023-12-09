import { createReducer } from '@reduxjs/toolkit'
import { uodateTourState, updateCurrentTourIndex, updateCurrentTourPage, updateTourModalStatus } from './actions'

const initialState = {
	openTour: '', // 开始漫游式引导功能 (smartMoney 模块)
	currentTourIndex: 0,
	currentTourPage: '',
	openTourModal: false
}

export default createReducer(initialState, (builder) => {
	builder
		.addCase(uodateTourState, (state, { payload: { openTour } }) => {
            state.openTour = openTour
		})
		.addCase(updateCurrentTourIndex, (state, { payload: { currentTourIndex } }) => {
            state.currentTourIndex = currentTourIndex
		})
		.addCase(updateCurrentTourPage, (state, { payload: { currentTourPage } }) => {
            state.currentTourPage = currentTourPage
		})
		.addCase(updateTourModalStatus, (state, { payload: { openTourModal } }) => {
            state.openTourModal = openTourModal
		})
})