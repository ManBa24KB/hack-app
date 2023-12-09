import { get, post } from './request'


export const getSmartScWallets = (params: any) => {
    return new Promise((resolve, reject) => {
        get('/api/users/getSmartScWallets', params).then((res: any) => {
            resolve(res)
        }, (error: any) => {
            reject(error.response)
        })
    })
}

export const getRevokeAlerts = (params: any) => {
    return new Promise((resolve, reject) => {
        get('/api/approve/revokeAlerts', params).then((res: any) => {
            resolve(res)
        }, (error: any) => {
            reject(error.response)
        })
    })
}

export const getApprovals = (params: any) => {
    return new Promise((resolve, reject) => {
        get('/api/approve/approvals', params).then((res: any) => {
            resolve(res)
        }, (error: any) => {
            reject(error.response)
        })
    })
}

export const getEventRevoke = (params: any) => {
    return new Promise((resolve, reject) => {
        get('/api/approve/eventRevoke', params).then((res: any) => {
            resolve(res)
        }, (error: any) => {
            reject(error.response)
        })
    })
}