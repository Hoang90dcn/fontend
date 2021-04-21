import request from './request'
export function addComment(data) {
    return request({
        url: 'save-comment?id_product=1',
        method: 'post',
        data: data


    })
}