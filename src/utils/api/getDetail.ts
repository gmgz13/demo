import axios from "axios";
import request from "../request";

export function getDetail(id :number = 1){
    return request(
        `/detail?id=${id}`,
        {
            body:{
                method:'get',
            },
            data:{}
        }
    )
}