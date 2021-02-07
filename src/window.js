/**
 * 为 window 绑定全局变量
 */

// events
import { EventEmitter } from "events"
window.ev =  new EventEmitter()

// device
window.device = (()=>{

    // ua
    const ua = navigator.userAgent

    // 是否为移动端
    // 取反我们一般认为是PC终端
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(ua)

    // 是否为微信设备
    const isWechat = /MicroMessenger/i.test(ua)

    // 是否为安卓设备
    const isAndroid = (ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1)

    // 是否为苹果设备
    const isIos = /iPhone|iPad|iPod/i.test(ua)

    // 是否为中文
    let isZHCN = true

    // 语言是否为cn
    // 浏览器为IE的情况
    if (ua.indexOf("MSIE") !=- 1 ){
        if (navigator.browserLanguage.toLowerCase() != "zh-cn" ){
            isZHCN = false
        }
    }else {
        if (navigator.language.toLowerCase() != "zh-cn" ){
            isZHCN = false
        }
    }

    return {
        isMobile,
        isWechat,
        isAndroid,
        isIos,
        isZHCN,
    }

})()

// conf
// process.env.NODE_ENV == "development" ? X : Y
window.conf = (()=>{
    return {
        apiBaseUrl: "http://", //API 请求地址
    }
})()


// 全局token
window.token = ()=>{
    return localStorage.getItem("token") ?? ""
}
