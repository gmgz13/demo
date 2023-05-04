import request from "../request";

export function getModel(){
    return request(
        '/car',
        {
            body:{
                method:'get',
            },
            data:{}
        }
    )
}