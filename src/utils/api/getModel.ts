import request from "../request";

export function getModel() {
    return request(
        '/car',
        {
            method: 'get',
            body: {},
            data: {}
        }
    )
}