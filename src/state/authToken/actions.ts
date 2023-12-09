import { createAction } from '@reduxjs/toolkit'

// fired once when the app reloads but before the app renders
// allows any updates to be applied to store data loaded from localStorage
export const userLogin = createAction<{token: string}>('authToken/userLogin')
export const userLogout = createAction<{}>('authToken/userLogout')