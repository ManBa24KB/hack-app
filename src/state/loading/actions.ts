import { createAction } from '@reduxjs/toolkit'

// fired once when the app reloads but before the app renders
// allows any updates to be applied to store data loaded from localStorage
export const setLoadingState = createAction<{isLoading: boolean}>('loading/setLoadingState')
export const setAddNodeLoadingState = createAction<{isLoading: boolean}>('loading/setAddNodeLoadingState')
export const setGlobleLoadingState = createAction<{isLoading: boolean}>('loading/setGlobleLoadingState')
export const setLoginModalLoadingState = createAction<{isLoading: boolean}>('loading/setLoginModalLoadingState')
export const setShowStepModalState = createAction<{isShowStepModal: boolean}>('loading/setShowStepModalState')
