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

export function getAllUsers() {
    return request({
        url: 'find-all-user',
        method: 'GET',
    })
}
export function updateStatusUser(id) {
    return request({
        url: 'update-status',
        method: 'PUT',
        params: {
            id: id,

        }
    })
}