import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { save, load } from 'redux-localstorage-simple' // 将Redux状态保存到LocalStorage或从LocalStorage加载Redux状态
import locale from './locale/reducer'
import loading from './loading/reducer'

const PERSISTED_KEYS: string[] = ['']

const rootReducer = combineReducers({
    locale,
    loading
})

// 对标准的Redux的createStore函数的抽象封装，包裹createStore （并集成了redux-thunk、Redux DevTools Extension）
// 传统的Redux，需要配置reducer、middleware、devTools、enhancers等，使用configureStore直接封装了这些默认值。
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false }), save({ states: PERSISTED_KEYS, debounce: 1000 })],
  preloadedState: load({ states: PERSISTED_KEYS }),
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store