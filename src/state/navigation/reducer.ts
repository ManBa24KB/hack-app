import { createReducer } from '@reduxjs/toolkit'
import { selectBarType, updateSearchInfo } from './actions'

const initialState = {
	barType: 'SideBar', // HorizontalBar 横向导航栏, SideBar 侧边导航栏
	searchInfo: {
		searchAddressKey: '', // 0xcc6cdd3b84bee496b94f223d049ca6638b05e507
		addressType: '',
		currentSearchKey: ''
	}
}

export default createReducer(initialState, (builder) => {
	builder
		.addCase(selectBarType, (state, { payload: { barType } }) => {
            state.barType = barType
		})
		.addCase(updateSearchInfo, (state, { payload: { searchAddressKey, addressType, currentSearchKey } }) => {
            state.searchInfo = {
				searchAddressKey,
				addressType,
				currentSearchKey
			}
		})
})