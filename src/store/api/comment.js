import request from '../utils/request'
export function postComment(data, id_product) {

    return request({
        url: 'save-comment',
        method: 'POST',
        params: {
            id_product: id_product,
        },
        data: data
    })
}

export function getCommentByProduct(id_product, page) {
    console.log(page)
    return request({
        url: 'find-all-comment-by-product',
        method: 'GET',
        params: {
            id_product: id_product,
            page: page,
        }
    })
}