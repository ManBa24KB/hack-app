import { createAction } from '@reduxjs/toolkit'

// fired once when the app reloads but before the app renders
// allows any updates to be applied to store data loaded from localStorage
export const uodateTourState = createAction<{openTour: string}>('localStorage/uodateTourState')
export const updateCurrentTourIndex = createAction<{currentTourIndex: number}>('localStorage/updateCurrentTourIndex')
export const updateCurrentTourPage = createAction<{currentTourPage: string}>('localStorage/updateCurrentTourPage')
export const updateTourModalStatus = createAction<{openTourModal: boolean}>('localStorage/updateTourModalStatus')
