import { createAction } from '@reduxjs/toolkit'

// fired once when the app reloads but before the app renders
// allows any updates to be applied to store data loaded from localStorage
export const updateAmbassdor = createAction<{isAmbassador: boolean}>('members/updateAmbassdor')
export const updateMembersType = createAction<{membersType: number}>('members/updateMembersType')
export const updateRealLevel = createAction<{realLevel: number}>('members/updateRealLevel')
export const updateUseTwitterStatus = createAction<{isVerifyTwitter: boolean}>('members/updateUseTwitterStatus')
export const updateUInsightStatus = createAction<{isInsightWith: boolean}>('members/updateUInsightStatus')
export const updateAddress = createAction<{address: string}>('members/updateAddress')
export const updateLoginType = createAction<{loginType: string}>('members/updateLoginType')