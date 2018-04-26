import fetch from 'utils/fetch';

export function pageList (query) {
    return fetch({
        url: '/answerApi/answerBank/pageList',
        method: 'get',
        params: query
    });
}

export function addObj (obj) {
    return fetch({
        url: '/answerApi/answerBank/add',
        method: 'post',
        data: obj
    });
}

export function getObj (id) {
    return fetch({
        url: '/answerApi/answerBank/user/' + id,
        method: 'get'
    });
}

export function delObj (id) {
    return fetch({
        url: '/answerApi/answerBank/' + id,
        method: 'delete'
    });
}

export function putObj (id, obj) {
    return fetch({
        url: '/answerApi/answerBank/' + id,
        method: 'put',
        data: obj
    });
}
