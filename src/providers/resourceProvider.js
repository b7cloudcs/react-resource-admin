// fetchProvider.js
import {jsonFetchWithAuthDefault} from './baseProvider';

/**
 * 拉取列表
 */
export const getIndex = (resourceName, queryParams) => {

    // mock
    return jsonFetchWithAuthDefault("//run.mocky.io/v3/5b2f81f2-5500-47eb-b29b-e80ad602efb3", {
        method: 'GET',
        queryParams: queryParams,
    })

    // fetch
    return jsonFetchWithAuthDefault("admin/"+resourceName, {
        method: 'GET',
        queryParams: queryParams,
    })
}

/**
 * 查看详情
 */
export const getShow= (resourceName, showId) => {

    // mock
    return jsonFetchWithAuthDefault("//run.mocky.io/v3/c7d48261-fd87-4386-8c55-4776bcbf7c7f", {
        method: 'GET',
    })

    // fetch
    return jsonFetchWithAuthDefault("admin/"+resourceName + "/"+ showId, {
        method: 'GET',
    })
}

/**
 * 创建新内容
 */
export const postCreate= (resourceName, body) => {

    // mock
    return jsonFetchWithAuthDefault("//run.mocky.io/v3/10d0a21a-c40f-4be3-891f-89ede912036b", {
        method: 'POST',
        body: JSON.stringify(body),
    })

    // fetch
    return jsonFetchWithAuthDefault("admin/"+resourceName, {
        method: 'POST',
        body: JSON.stringify(body),
    })
}

/**
 * 更新内容
 */
export const putEdit= (resourceName, body) => {

    // mock
    return jsonFetchWithAuthDefault("//run.mocky.io/v3/10d0a21a-c40f-4be3-891f-89ede912036b", {
        method: 'PUT',
        body: JSON.stringify(body),
    })

    // fetch
    return jsonFetchWithAuthDefault("admin/"+resourceName + "/"+ body.id, {
        method: 'PUT',
        body: JSON.stringify(body),
    })
}

/**
 * 删除内容
 */
export const deleteDelete= (resourceName, showId) => {

    // mock
    return jsonFetchWithAuthDefault("//run.mocky.io/v3/10d0a21a-c40f-4be3-891f-89ede912036b", {
        method: 'DELETE',
    })

    // fetch
    return jsonFetchWithAuthDefault("admin/"+resourceName + "/"+ showId, {
        method: 'DELETE',
    })
}