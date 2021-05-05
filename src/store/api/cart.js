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

    return request({
        url: 'admin/find-all-new-cart',
        method: 'GET',
    })
}
export function confirm(cart_id) {
    return request({
        url: 'admin/confirm',
        method: 'GET',
        params: {
            cart_id: cart_id
        }
    })
}

export function cancel(cart_id) {
    return request({
        url: 'admin/cancel-cart',
        method: 'PUT',
        params: {
            cart_id: cart_id
        }

    })

}