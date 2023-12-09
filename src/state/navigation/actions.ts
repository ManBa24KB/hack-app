import { createAction } from '@reduxjs/toolkit'

// fired once when the app reloads but before the app renders
// allows any updates to be applied to store data loaded from localStorage
export const selectBarType = createAction<{barType: string}>('navigation/selectBarType')

export const updateSearchInfo = createAction<{
    searchAddressKey: string, // 0xcc6cdd3b84bee496b94f223d049ca6638b05e507
    addressType: string,
    currentSearchKey: string,
}>('navigation/updateSearchInfo')