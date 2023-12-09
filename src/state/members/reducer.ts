import { createReducer } from '@reduxjs/toolkit'
import { updateAmbassdor, updateMembersType, updateRealLevel, updateUseTwitterStatus, updateUInsightStatus, updateAddress, updateLoginType } from './actions'

const initialState = {
	membersType: 500, // 500:未登录的用户 （已登录的用户0:免费用户  1:pro 2:vc pro  100:内部用户，无任何限制）
	realLevel: 500, // 真实用户
	isVerifyTwitter: false, // 用户是否绑定过twitter
	isInsightWith: false, // 是否在insight白名单内
	address: '',
	isAmbassador: false,
	loginType: ''
}

export default createReducer(initialState, (builder) => {
	builder
		.addCase(updateAmbassdor, (state, { payload: { isAmbassador } }) => {
			state.isAmbassador = isAmbassador
		})
		.addCase(updateMembersType, (state, { payload: { membersType } }) => {
            state.membersType = membersType
		})
		.addCase(updateRealLevel, (state, { payload: { realLevel } }) => {
            state.realLevel = realLevel
		})
		.addCase(updateUseTwitterStatus, (state, { payload: { isVerifyTwitter } }) => {
            state.isVerifyTwitter = isVerifyTwitter
		})
		.addCase(updateUInsightStatus, (state, { payload: { isInsightWith } }) => {
            state.isInsightWith = isInsightWith
		})
		.addCase(updateAddress, (state, { payload: { address } }) => {
            state.address = address
		})
		.addCase(updateLoginType, (state, { payload: { loginType } }) => {
            state.loginType = loginType
		})
})