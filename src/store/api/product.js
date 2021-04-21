import request from '../utils/request'

export function loadProductHomePage() {
    return request({
        url: 'find-all-product?page=0',
        method: "GET",

    })
}

export function loadAllProduct() {
    return request({
        url: 'admin/find-all-product',
        method: "GET",

    })
}
export function addProduct(data) {

    return request({
        url: 'admin/save-test-product',
        method: "POST",
        data: data.formData,
        params: {
            category_id: data.category_id,
            provider_id: data.provider_id,
        },
    })
}

export function deleteProduct(product_id) {
    return request({
        url: 'admin/delete-product',
        method: "DELETE",
        params: {
            product_id: product_id

        },
    })
}

export function getDetailProduct(product_id) {
    return request({
        url: 'find-one',
        method: "GET",
        params: {
            product_id: product_id

        },
    })
}