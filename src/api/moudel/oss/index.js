import fetch from 'utils/fetch';

export function ossToken () {
    return fetch({
        url: '/ossApi/aliyun/oss/policy',
        method: 'get',
        params: ''
    });
}
export function tiiaoOss (url, data) {
    return fetch({
        url: '/aliOss',
        method: 'post',
        data: data
    });
}
