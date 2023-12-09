/**
 * 网络请求配置
 */
import axios from 'axios'
import {message} from 'antd'
import {getValueByUrlParams} from '@/utils'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {userLogout} from '@/state/authToken/actions'
import {useAppDispatch} from '@/state/hooks'
import {setGlobleLoadingState} from '@/state/loading/actions'
import {setLoginModalLoadingState} from '@/state/loading/actions'
import {
    updateMembersType,
    updateUInsightStatus,
    updateUseTwitterStatus,
    updateAddress,
    updateLoginType
} from '@/state/members/actions'
import CryptoJS from 'crypto-js'

const instance = axios.create()
instance.defaults.timeout = 100000
instance.defaults.baseURL = 'https://armour-hackathon.0xscope.com/'
let isInvalidToken: boolean = false

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url: any, params?: Object): Promise<unknown> {
    return new Promise((resolve, reject) => {
        instance.get(url, {
            params: params,
        }).then((response: any) => {
            resolve(response?.data)
        }).catch((error) => {
            reject(error)
        })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url: any, data?: Object): Promise<unknown> {
    return new Promise((resolve, reject) => {
        instance.post(url, data).then(
            (response) => {
                //关闭进度条
                if (url === '/api/project/userSegmentation/exportAddress' || url === '/api/token/holder/segmentation/exportAddress') {
                    resolve(response)
                } else {
                    resolve(response?.data)
                }
            },
            (err) => {
                reject(err)
            }
        )
    })
}

function getCryptoKey(t: number) {
    return t % 2 == 0 ? random1() : random2()
}

function random1() {
    // ZnVjayB5b3UgYnJvdGhlcg==     fuck you brother
    // var e = ["Z", "n", "V", "j", "a", "y", "B", "5", "b", "3", "U", "g", "Y", "n", "J", "v", "d", "G", "h", "l", "c", "g", "=", "="]
    var e = ["Z", "n", "V", "j", "a", "y", "U", "g", "Y", "n", "J", "v", "d", "G", "h", "l", "c", "g", "=", "="],
        t = ["9", "L", "9", "P", "c", "n", "f", "5", "V", "d", "B", "5", "b", "3", "j", "c", "9", "U", "w", "6"];
    return e.splice(6, 0, ...t.slice(10, 14)), e.join("")
}

function random2() {
    // YnJvdGhlciBmdWNrIHlvdQ==     brother fuck you
    // var e = ["Y", "n", "J", "v", "d", "G", "h", "l", "c", "i", "B", "m", "d", "W", "N", "r", "I", "H", "l", "v", "d", "Q", "=", "="]
    var e = ["d", "G", "h", "l", "c", "i", "B", "m", "d", "W", "N", "r", "I", "H", "l", "v", "d", "Q", "=", "="],
        t = ["X", "O", "r", "i", "i", "6", "H", "H", "Y", "n", "J", "v", "p", "4", "f", "E", "O", "x", "v", "U"];
    return [...t.slice(8, 12), ...e].join("")
}

function getRequestKey(timestamp: number, url: string) {
    const key: any = getCryptoKey(timestamp);
    const sign = CryptoJS.HmacSHA256(url + timestamp, key).toString();
    const random = parseInt(Math.random() * 10 + "");
    const aa = "" + sign.substring(0, 12) + random + sign.substring(sign.length - 12, sign.length);
    return aa.split("")
        .map((e => Math.random() > .6 ? e.toLocaleUpperCase() : e))
        .join("");
}

const AxiosInterceptor = ({children}: any) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [isSet, setIsSet] = useState(false)

    useEffect(() => {
        // http request 拦截器
        const reqInterceptor = (config: any) => {
            let chain: string = localStorage.getItem('chain') || 'eth'
            const chainName: string = getValueByUrlParams('network') ? getValueByUrlParams('network') : chain
            config.data = JSON.stringify(config.data)
            const timestamp = new Date().getTime()
            const url = config.url;
            const requestKey = getRequestKey(timestamp, url);
            if (config.method === 'get' && config.params && config.params.need) {
                config.headers = {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "lang": localStorage.getItem('localType') || 'en_US',
                    "chain": chainName,
                    "timestamp": timestamp,
                    "REQUEST-KEY": requestKey
                }
            } else {
                config.headers = {
                    "Content-Type": config.url === "/api/customer/report/add" ? "multipart/form-data" : "application/json",
                    "AUTH-TOKEN": localStorage.getItem('token') || '',
                    "lang": localStorage.getItem('localeType') || 'en_US',
                    "chain": chainName,
                    "timestamp": timestamp,
                    "REQUEST-KEY": requestKey
                }
            }
            return config
        }

        // http response 拦截器
        const resInterceptor = (response: any) => {
            isInvalidToken = false
            if (response.headers['auth-token']) {
                localStorage.setItem('token', response.headers['auth-token'])
            }
            return response
        }

        // http 请求失败统一处理
        const errInterceptor = (error: any) => {
            console.log('error==', error.response)
            let code: number = 500
            if (error.response && error.response.data && error.response.data.code) {
                code = error.response.data.code
            }
            dispatch(setGlobleLoadingState({isLoading: false}))
            setTimeout(() => {
                isInvalidToken = false
            }, 800)
            if ([1502, 1505].includes(code)) { // 1505token无效，1502用户不在白名单内
                if (!isInvalidToken) {
                    dispatch(userLogout({}))
                    dispatch(updateMembersType({membersType: 500000}))
                    dispatch(updateUseTwitterStatus({isVerifyTwitter: false}))
                    dispatch(setLoginModalLoadingState({isLoading: false}))
                    dispatch(updateUInsightStatus({isInsightWith: false}))
                    dispatch(updateAddress({address: ''}))
                    dispatch(updateLoginType({loginType: ''}))
                    navigate('/home')
                }
            } else {
                if (!isInvalidToken) {
                    isInvalidToken = true
                    if (![1709, 1711, 20032, 20033, 19100, 20030].includes(error.response.data.code) && error.response.data.message) {
                        if (error.response && error.response.data) {
                            message.error(error.response.data.message)
                        } else {
                            // message.error("system error!")
                        }
                    }
                }
            }
            return error.response
        }

        const requestInterceptor = instance.interceptors.request.use(reqInterceptor, errInterceptor)

        const responseInterceptor = instance.interceptors.response.use(resInterceptor, errInterceptor)

        setIsSet(true)

        return () => {
            instance.interceptors.request.eject(requestInterceptor)
            instance.interceptors.response.eject(responseInterceptor)
        }
    }, [])
    return isSet && children
}
export {AxiosInterceptor}