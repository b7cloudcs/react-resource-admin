// authProvider.js
import {jsonFetch, jsonFetchWithAuthDefault} from './baseProvider';

// /**
//  * 登陆
//  */
// export const login = ({ username, password }) => {
//
//     // jsonFetch
//     // 登陆成功mock http://run.mocky.io/v3/8a725617-e728-412e-aaa5-b0b430bf3ea8
//     // 登陆失败mock http://run.mocky.io/v3/882725d7-e05f-4f85-b8d3-11ef63f52b9a
//     return jsonFetch("admin/login", {
//         method: 'POST',
//         body: JSON.stringify({ username, password }),
//     }).then(response => {
//         // error
//         if (response.status < 200 || response.status >= 300) {
//             localStorage.removeItem('authorization')
//             localStorage.removeItem('role')
//             // data
//             return response.json().then(data => {
//                 return Promise.reject(data)
//             });
//         }
//         return response.json()
//     }).then((data) => {
//         localStorage.setItem('authorization', data.token)
//         localStorage.setItem('role', data.role)
//         return Promise.resolve(data)
//     })
// }
//
// /**
//  * 拉取用户信息
//  */
// export const userInfo = () => {
//     // jsonFetch
//     // 成功mock http://run.mocky.io/v3/8a725617-e728-412e-aaa5-b0b430bf3ea8
//     // 失败mock https://run.mocky.io/v3/66ac97cd-d03a-4c96-9bcf-ad6c02fb2509
//     return jsonFetchWithAuthDefault("admin/user", {
//         method: 'GET',
//     }).then(response => response.json())
// }
//
// /**
//  * 注销用户
//  */
// export const userSignOut = () => {
//     localStorage.removeItem('authorization')
//     localStorage.removeItem('role');
//     return Promise.resolve();
// }
//
// /**
//  * 读取权限信息
//  */
// export const userPermissions = () => {
//     const role = localStorage.getItem('role');
//     return Promise.resolve(role);
// }