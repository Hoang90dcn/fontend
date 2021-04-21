import request from '../utils/request'

export function loadProvider() {
    return request({
        url: 'find-all-provides',
        method: "GET",
    })
}