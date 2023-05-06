import request from "../request";

export function search(data: string) {
    return request(
        `/search?data=${data}`,
        {
            method: 'get',
            body: {},
            data: {}
        }
    )
}