import request from '../utils/request'

export function getAllByParentId(parent_id) {
    return request({
        url: 'get-dia-chi',
        method: "GET",
        params: {
            parent_id: parent_id
        }
    })
}