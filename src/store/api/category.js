import request from '../utils/request'
export function loadCategories(id) {
    console.log(id);
    return request({
        url: 'find-all-category',
        method: 'GET',
        params: {
            id: id,
        }
    })
}

export function loadCategory(id) {
    console.log(id);
    return request({
        url: 'find-one-category',
        method: 'GET',
        params: {
            id: id,
        }
    })
}

export function saveCategoryApi(data) {
    console.log(data);
    return request({
        url: 'add-Category',
        method: 'POST',
        data: data
    })
}


export function updateStatus(id) {
    console.log(id);
    return request({
        url: 'update-category',
        method: 'GET',
        params: {
            id: id,
        }
    })
}