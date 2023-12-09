import { get, post } from './request'

/**
* 获取关联地址
* params: { address: '地址' }
**/
const getRelatedAddress = (params: any) => {
    return new Promise((resolve, reject) => {
        get('/api/tools/address/getRelatedAddress', params).then((res: any) => {
            resolve(res)
        }, (error: any) => {
            reject(error.response)
        })
    })
}

/**
* 获取关联地址
* params: { address: '地址' }
**/
const getRelatedAddressNew = (params: any) => {
    return new Promise((resolve, reject) => {
        get('/api/tools/address/getRelatedAddressNew', params).then((res: any) => {
            resolve(res)
        }, (error: any) => {
            reject(error.response)
        })
    })
}

/**
* 获取地址基本信息
* params: { address: '地址' }
**/
const getAddressInfo = (params: any) => {
    return new Promise((resolve, reject) => {
        get('/api/tools/address/getAddressInfo', params).then((res: any) => {
            resolve(res)
        }, (error: any) => {
            reject(error.response)
        })
    })
}

/**
* 获取地址的地址集合
* params: { address: '地址' }
**/
const getAddressClusterDetail = (params: any) => {
    return new Promise((resolve, reject) => {
        get('/api/tools/address/clusterDetail', params).then((res: any) => {
            resolve(res)
        }, (error: any) => {
            reject(error.response)
        })
    })
}

/**
* 获取Token地址基本信息
* params: { address: '地址' }
**/
const getTokenAddressDetailInfo = (params: any) => {
    return new Promise((resolve, reject) => {
        get('/api/tools/token/getAddressInfo', params).then((res: any) => {
            resolve(res)
        }, (error: any) => {
            reject(error.response)
        })
    })
}

/**
* 获取token地址集合
* params: { address: '地址' }
**/
const getTokenClusterDetail = (params: any) => {
    return new Promise((resolve, reject) => {
        get('/api/tools/token/clusterDetail', params).then((res: any) => {
            resolve(res)
        }, (error: any) => {
            reject(error.response)
        })
    })
}

/**
* 获取token关联信息
* params: { address: '地址' }
**/
const getTokenRelatedAddress = (params: any) => {
    return new Promise((resolve, reject) => {
        get('/api/tools/token/getTokenDistribution', params).then((res: any) => {
            resolve(res)
        }, (error: any) => {
            reject(error.response)
        })
    })
}

/**
* 获取地址类型
* params: { address: '地址' }
**/
const getAddressType = (params: any) => {
    return new Promise((resolve, reject) => {
        get('/api/search/address', params).then((res: any) => {
            resolve(res)
        }, (error: any) => {
            reject(error.response)
        })
    })
}

/**
* 通过token获取地址详情
* params: { address: '地址', tokenAddress: '合约地址' }
**/
const getAddressInfoByToken = (params: any) => {
    return new Promise((resolve, reject) => {
        get('/api/tools/token/info', params).then((res: any) => {
            resolve(res)
        }, (error: any) => {
            reject(error.response)
        })
    })
}

/**
* 获取token列表
* params: { address: '地址' }
**/
const tokenSearchService = (params: any) => {
    return new Promise((resolve, reject) => {
        get('/api/tools/token/search', params).then((res: any) => {
            resolve(res)
        }, (error: any) => {
            reject(error.response)
        })
    })
}

export {
    getRelatedAddress,
    getRelatedAddressNew,
    getAddressInfo,
    getAddressClusterDetail,
    getTokenRelatedAddress,
    getAddressType,
    getAddressInfoByToken,
    getTokenAddressDetailInfo,
    getTokenClusterDetail,
    tokenSearchService
}
