import request from "../request";

export function getUser(phone: string) {
    return request(
        `/user?phone=${phone}`,
        {
            method: 'get',
            body: {},
            data: {}
        }
    )
}