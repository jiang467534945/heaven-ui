import fetch from 'utils/fetch';

export function pageList(query) {
    return fetch({
        url: '/api/ucenterUser/pageList',
        method: 'get',
        params: query
    });
}

export function addObj(obj) {
    return fetch({
        url: '/api/admin/user',
        method: 'post',
        data: obj
    });
}

export function getObj(id) {
    return fetch({
        url: '/api/admin/user/' + id,
        method: 'get'
    })
}

export function delObj(id) {
    console(fetch({
        url: '/api/admin/user/' + id,
        method: 'delete'
    }))
    return fetch({
        url: '/api/admin/user/' + id,
        method: 'delete'
    })
}

export function putObj(id, obj) {
    return fetch({
        url: '/api/admin/user/' + id,
        method: 'put',
        data: obj
    })
}
