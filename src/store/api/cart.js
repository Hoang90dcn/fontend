import request from '../utils/request'
export function saveCart(data) {
    console.log(data);
    return request({
        url: 'save-cart',
        method: 'POST',
        data: data


    })
}
export function getAllCart() {
    console.log(data);
    return request({
        url: 'admin/find-all-new-cart',
        method: 'GET',
    })
}