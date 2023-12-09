import { createReducer } from '@reduxjs/toolkit'
import { selectLanguageHandler } from './actions'
import zh_CN from '@/i18n/zh_CN'
import en_US from '@/i18n/en_US'

const initialState = {
	localeState: localStorage.getItem('localeType') === 'zh_CN' ? zh_CN : en_US,
    localeType: localStorage.getItem('localeType') === 'zh_CN' ? 'zh_CN' : 'en_US',
}

export default createReducer(initialState, (builder) => {
	builder
		.addCase(selectLanguageHandler, (state: any, { payload: { localeType } }) => {
            switch (localeType) {
                case 'zh_CN':
                    state.localeState = zh_CN
                    state.localeType = localeType
                    break
    
                case 'en_US':
                    state.localeState = en_US
                    state.localeType = localeType
                break
    
                default:
                    state.localeState = en_US
                    state.localeType = localeType
                    break
            }
			
		})
})