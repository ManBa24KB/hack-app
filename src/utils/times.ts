export const timestampToTime = (timestamp:number, type: string) => {
    let timerStr:number = timestamp.toString().length === 13 ? timestamp : timestamp * 1000
    let date = new Date(timerStr)
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1) + '-';
    let day = (date.getDate()< 10 ? '0'+date.getDate():date.getDate());
    let D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate())+ ' ';
    let h = (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+ ':';
    let m = (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes()) + ':';
    let s = date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds();
    if (type === 'DayTimes') {
        return Y+M+D+h+m+s
    } else if (type === 'Day') {
        return Y+M+day
    }
}

//时间戳转换成日期时间2014-8-8 下午11：40：20
export const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}

//时间戳转换成八位日期2014-5-5 
export const userDate = (timestamp: number) => {
    var myDate = new Date(timestamp * 1000);
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    return year + '-' + month + '-' + day;
}

//时间戳转换成四位时间10:10  
export const userTime = (timestamp: number) => {
    var myDate = new Date(timestamp * 1000);
    var hours = myDate.getHours();
    var minutes = myDate.getMinutes();
    return hours + ':' + minutes;
}

//时间戳转换成四位时间10:10:00
export const userTimer = (timestamp: number) => {
    var myDate = new Date(timestamp * 1000);
    var hours = myDate.getHours();
    var minutes = myDate.getMinutes();
    var second = myDate.getSeconds();
    return hours + ':' + minutes + ':' + second;
}

//时间戳改成时间格式2014-12-12 下午01：10
export const js_date_time = (timestamp: number) => {
    var timestr = new Date(timestamp * 1000);
    var datetime = timestr.toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    return datetime;
}

// 将时间撮转换成utc时间
export const chinaTimeToUtcTime = (timestamp: number, type: string) => {
    // 北京时间比utc时间多八个时区
    // const timer: number = timestamp - 8 * 60 * 60
    // return timestampToTime(timer, type)
    return toUtc(timestamp, type)
}

export const timestampToDay = (timestamp: number) => {
    const currentTimer: number = new Date().getTime() / 1000 - 8 * 60 * 60
    const timer: number = timestamp - 8 * 60 * 60
    const subTimer: number = currentTimer - timer
    let day: number| string = parseInt(subTimer / (24 * 3600) + '')
    //得到小时 格式化成前缀加零的样式
    let h: number | string = parseInt(subTimer / 60 / 60 % 24 + '')
    //得到分钟 格式化成前缀加零的样式
    let m: number | string = parseInt(subTimer / 60 % 60 + '')
    //得到秒 格式化成前缀加零的样式
    let s: number | string = parseInt(subTimer % 60 + '')
    if (day > 0) {
        if (h > 0) {
            return `${day} ${day === 1 ? 'day' : 'days'} ${h} ${h === 1 ? 'hr' : 'hrs'} ago`
        } else {
            return `${day} ${day === 1 ? 'day' : 'days'} ago`
        }
    } else if (day === 0 && h > 0) {
        if (m > 0) {
            return `${h} ${h === 1 ? 'hr' : 'hrs'} ${m} min ago`
        } else {
            return `${h} ${h === 1 ? 'hr' : 'hrs'} ago`
        }
    } else if (day === 0 && h === 0 && m > 0) {
        return `${m} min ago`
    } else if (day === 0 && h === 0 && m === 0 && s > 0) {
        return `${s} sec ago`
    } else {
        return `${1} sec ago`
    }
}

const toUtc = (timestamp: number, type: string) => {
    if (timestamp) {
        let timerStr:number = timestamp.toString().length === 13 ? timestamp : timestamp * 1000
        let date = new Date(timerStr)
        let Y = date.getUTCFullYear() + '-';
        let M = (date.getUTCMonth()+1 < 10 ? '0'+(date.getUTCMonth()+1):date.getUTCMonth()+1) + '-';
        let day = (date.getUTCDate()< 10 ? '0'+date.getUTCDate():date.getUTCDate());
        let D = (date.getUTCDate()< 10 ? '0'+date.getUTCDate():date.getUTCDate())+ ' ';
        let h = (date.getUTCHours() < 10 ? '0'+date.getUTCHours():date.getUTCHours())+ ':';
        let m = (date.getUTCMinutes() < 10 ? '0'+date.getUTCMinutes():date.getUTCMinutes()) + ':';
        let s = date.getUTCSeconds() < 10 ? '0'+date.getUTCSeconds():date.getUTCSeconds();
        if (type === 'DayTimes') {
            return Y+M+D+h+m+s
        } else if (type === 'Day') {
            return Y+M+day
        }
    }
}