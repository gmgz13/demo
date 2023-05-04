import request from "../request";

export function login(phone:number,password:string){
    return request(
        `/login`,
        {
            body:{
                method:'',
            },
            data:{phone,password}
        }
    )
}