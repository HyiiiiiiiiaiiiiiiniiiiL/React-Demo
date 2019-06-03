
import AxiosRequest from './AxiosRequest';

export const limitLabelLength = (text, len = 30) => {
    if (text.length <= len) {
        return text;
    }
    return text.substring(0, len) + '...';
}

export const formatDate = (dateTime, isDetail, separator = "/") => {
    let date = new Date(dateTime)
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d
    if (!isDetail) return y + separator + m + separator + d
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    return y + separator + m + separator + d + ' ' + h + ':' + minute;
}

export const isPhoneAvailable = (str) => {
    let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!reg.test(str)) {
        return false;
    } else {
        return true;
    }
}

export const isEmailAvailable = (str) => {
    let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if (!reg.test(str)) {
        return false;
    } else {
        return true;
    }
}

export const isPasswordAvailable = (str) => {
    let reg = /^\w{8,16}$/;
    if (!reg.test(str)) {
        return false;
    } else {
        return true;
    }
}

export const isCodeAvailable = (str) => {
    let reg = /^\d{6}$/;
    if (!reg.test(str)) {
        return false;
    } else {
        return true;
    }
}

export const timestampToTime = (timestamp) => {
    if (!timestamp) return false
    let date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear()
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
    let D = date.getDate()
    let h = date.getHours()
    let m = date.getMinutes()
    // let s = date.getSeconds();
    return `${Y}年${M}月${D}日 ${h}:${m}`
}

// 下载文件
export const downloadFile = (src, filename) => {
    const eleLink = document.createElement('a')
    eleLink.style.display = 'none'
    AxiosRequest.get(src, { responseType: "blob" }).then(res => {
        const blob = new Blob([res.data])
        const url = window.URL.createObjectURL(blob)
        eleLink.href = url
        if (filename) eleLink.download = filename
        document.body.appendChild(eleLink)
        eleLink.click()
        document.body.removeChild(eleLink)
    })
}