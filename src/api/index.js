import HttpRequest from '@/axios/api.request'

const api = {
    hostPre: '/api/host',
    injectPre: '/api/inject',
    deliverDataPre: '/api/deliver',
    pingPre: '/api/ping',
}

export const createHostAPI = () => {
    return HttpRequest.request({
        url: `${api.hostPre}`,
        method: 'post',
    })
}

export const injectAPI = () => {
    return HttpRequest.request({
        url: `${api.injectPre}`,
        method: 'post',
    })
}

export const deliverDataAPI = (parameter) => {
    return HttpRequest.request({
        url: `${api.deliverDataPre}`,
        method: 'get',
        params: {
            fromIp: parameter.fromIp,
            toIp: parameter.toIp,
            data: parameter.data,
        }
    })
}

export const pingAPI = (parameter) => {
    return HttpRequest.request({
        url: `${api.pingPre}`,
        method: 'get',
        params: {
            fromIp: parameter.fromIp,
            toIp: parameter.toIp,
        }
    })
}