import request from "../request";

export function wish(...data: string[]) {
    return request(
        `/wish`,
        {
            method: 'post',
            body: {},
            data: {data}
        }
    )
}