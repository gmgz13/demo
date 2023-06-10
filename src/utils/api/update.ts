import request from "../request";



export function update(data: {}) {
    console.log(data)
    return request(
        '/update',
        {
            method: 'post',
            body: {},
            data: data
        }
    )
}