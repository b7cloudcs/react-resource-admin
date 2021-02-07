// baseProvider.js

/**
 * 后台接口配置
 */
export const apiBaseUrl = window.conf.apiBaseUrl;

/**
 * API URL 拼接
 */
export const apiPathJoin = url => {

    // 绝对地址
    if(
        url.search("http://") != -1 ||
        url.search("https://") != -1
    ){
        return url
    }

    // 拼接地址
    return apiBaseUrl+ "/" + url
}


/**
 * queryParams 处理
 * 拼接 url 地址
 */
export const queryParams = (params) => {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

/**
 * jsonFetch 封装
 * @param {*} url url 地址
 * @param {*} options fetch option
 */
export const jsonFetch = (url, options = {})=> {

    // queryParams
    if(options.queryParams) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.queryParams);
        delete options.queryParams;
    }

    // fetch
    return fetch(apiPathJoin(url), options)
}

/**
 * jsonFetch 封装通过登陆
 * @param {*} url url 地址
 * @param {*} options fetch option
 */
export const jsonFetchWithAuth = (url, options = {})=> {

    // headers
    options.headers = options.headers??{}
    options.headers['authorization'] = localStorage.getItem('authorization')

    // fetch
    return jsonFetch(url, options).then(response => {

        // error
        if (response.status < 200 || response.status >= 300) {
            return Promise.reject(response)
        }

        return Promise.resolve(response)
    })
}


/**
 * jsonFetchWithAuthDefault
 * @param {*} url url 地址
 * @param {*} options fetch option
 */
export const jsonFetchWithAuthDefault = (url, options = {})=> {

    // fetch
    return jsonFetchWithAuth(url, options).catch(response => {

        // error
        // if (response.status == 400) ...
        // if (response.status == 401) ...

        // try it
        try {
            // 默认错误弹窗
            return response.json().catch(error=> {
                alert("网络异常")
                return Promise.reject({})
            }).then(data => {
                // 解析正确
                alert(data.msg)
                return Promise.reject(data)
            })
        } catch (error) {
            // 网络异常
            alert("网络异常")
            return Promise.reject({})
        }
    })
}