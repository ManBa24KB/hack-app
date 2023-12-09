
import uts46 from 'idna-uts46'

export const isValidNumber = (num: number) => {
    return num != null && isFinite(num);
}

//随机数，用于绑定id
export const uuid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
    }

    return (
        s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    )
}

// 字符串首字母大写
export const formatStringToUppercase = (str: string) => {
    let newStr: string = ''
    if (str) {
        newStr = str.slice(0, 1).toUpperCase() + str.slice(1)
    }
    return newStr
}

//通过id获取图片
export function getUrlCode(name: string, str: string) {
    const reg = new RegExp(`(^|&)${ name}=([^&]*)(&|$)`);
    const r = str.substr(1).match(reg)
    if (r != null) {
        return  decodeURIComponent(r[2])
    }
    return ''
}

//数字每三位逗号分隔
export const handleNumbersSeparated = (val: any) => {
    let result = [], counter = 0
    let num_array = val.data.toString().split('.')
    let num = num_array[0]
    let str = ''
    for(let i = num.length - 1; i >= 0; i--){
        counter++
        result.unshift(num[i])
        if((!(counter % 3 )) && i != 0) {
            result.unshift(',')
        }
    }
    if(num_array.length > 1) {
        str = result.join('')
        str += '.' + num_array[1]
        return str
    }else {
        return str = result.join('')
    }
}

//去除特殊字符~!@#$^-&*()=|{}':;',\[].<>/?~！@#￥……&*（）——|{}【】'；：""'。，、？
export function trimNoSpaceSpecial(string: string) {
    //替换字符串中的所有特殊字符（包含空格）
    if (string != "") {
        const pattern = /[`~!@#$^\-&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;
        string = string.replace(pattern, "");
    }
    return string
}

// 去除特殊字符，不去空格
export function trimSpecial(s: string) {
    let pattern = new RegExp("[`~!@#$^&*()=|{}:;,\\[\\].<>/?~！@#￥……&*（）——|{}【】；：”“。，、？]")
    let rs = "";
    for (let i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs
}

//科学计数法转数字
export const getFullNum = (num: number) => {
    //处理非数字
    if(isNaN(num)) {
        return num
    }
    //处理不需要转换的数字
    let str = '' + num
    if(!/e/i.test(str)) {
        return num
    }
    return (num).toFixed(18).replace(/\.?0+$/, "")
}

export const formarAddress = (address: string, subLength: number) => {
    return `${address.substring(0, subLength)}...${address.substring(address.length - subLength)}`
}

//判断ens 是否有特殊字符
export const handleEns = (string: string) => {
    let ensString: string = ''
    try {
            ensString = uts46.toAscii(string,{useStd3ASCII: true})
            if(string === ensString) {
                return true
            }else {
                return false
            }
    } catch (error: any) {
        return false 
    }
}


export const formarLabelAddress = (address: string, subLength: number) => {
    if (address.length <= subLength) {
        return address
    } else {
        return `${address.substring(0, subLength)}...`
    }
}

export const color16 = () => {
    let r = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let color = `#` + r.toString(16) + b.toString(16) + g.toString(16)
    return color
}

export const renderSize = (value: number) => {
    let res: string = ''
    let val: number = 1000
    if (value < 1) {
        res = '<$1'
    } else if (value < val) {
        res = `$${value.toFixed(2)}`
    } else {
        if (value < (val * val)) {
            var temp: number = value / val
            let tempStr: string = temp.toFixed(2)
            res =  '$' + tempStr + 'K'
        } else if (value < (val* val * val)) {
            var temp = value / (val * val)
            let tempStr: string = temp.toFixed(2)
            res = '$' + tempStr + 'M'
        } else {
            var temp = value / (val * val * val)
            let tempStr: string = temp.toFixed(2)
            res = '$' + tempStr + 'B'
        }
    }
    return res
}

export const getPopupContainer = (id: string) => {
    return document.getElementById(id) || ''
}

// 超过长度换行，不切割单词
export const textWrap = (text: string) => {
    let str = ''
    let maxNum = 30
    let arr = text.split(' ')
    let tmp = ''
    arr.forEach(item => {
        if (item.length >= maxNum) {
            str = str + item + '\n'
        } else {
            if (tmp.length + item.length < maxNum) {
                tmp = tmp + item + ' '
            } else {
                str = str + tmp + '\n'
                tmp = item + ' '
            }
        }
    })
    str = str + tmp
    return str
}

//（获取url某个参数的值）
export const getValueByUrlParams = (key: string) => {
    let url = window.location.href;
    const paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    const paraObj: any = {}
    let i, j
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[key.toLowerCase()];
    if (typeof(returnValue) == "undefined") {
    return "";
    } else {
    return returnValue;
    }
}

export const getCoinImg = (coinId: string) => {
    if (coinId) {
        let url: string = `https://www.0xscope.com/images/coin-token/${coinId}/logo.png`
        return url
    } else {
        return ''
    }
}

export const getChainLogo = (chain: string) => {
    if (chain) {
        let url: string = `https://www.0xscope.com/images/chain-image/${chain}/logo.png`
        return url
    } else {
        return ''
    }
}

export const validateEmail = (email: string) => {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

export const getCountryLogo = (country: string) => {
    if (country) {
        let url: string = `https://www.0xscope.com/images/country/${country}/logo.png`
        return url
    } else {
        return ''
    }
}

export const formatNumber = (num: number) => {
    const newNum: number = Math.abs(num)
    // 定义一个数组，存储不同的单位和除数
    const units = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "K" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "B" },
        { value: 1e12, symbol: "T" },
    ]
    if (newNum < 1000) { } else {
        // 从数组的最后一个元素开始遍历，找到第一个符合条件的单位
        for (let i = units.length - 1; i > 0; i--) {
            if (newNum >= units[i].value) {
                // 用数字除以单位对应的除数，保留两位小数，并拼接单位符号
                return parseFloat((num / units[i].value).toFixed(3)) + units[i].symbol
            }
        }
    }
    // 如果没有找到符合条件的单位，就返回原始数字
    const newVal: string = num + ''
    const arr: string[] = newVal.split('.')
    return arr.length === 1 ? num.toString() : parseFloat(num.toFixed(3))
}

// 判断字符串是否有小数点
export const isInteger = (str: string) => { 
    var hasDot = / [\\.]/.test(str) // hasDot 为 true12
    return hasDot
}

export const getEFullNum = (val: number) => {
    //处理不需要转换的数字
    console.log('strNum==', val)
    return (val).toFixed(18).replace(/\.?0+$/, "")
}
