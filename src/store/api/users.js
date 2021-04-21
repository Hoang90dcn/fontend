import request from '../utils/request'

export function login(data) {
    console.log(data);
    return request({
        url: 'login',
        method: 'post',
        data: data
    })
}

export function getInfo() {
    return request({
        url: 'info-user',
        method: 'get',

    })
}