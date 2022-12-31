import {postRequest} from "../lib/Api";

interface RegisterData {
    visitor?: boolean;
    username?: string;
    password?: string;
}

const register = async (data: RegisterData = {}) => {
    const { visitor } = data;
    let path = '/authentication/register/';

    if(visitor){
        path += 'guest';
    }

    return await postRequest(path,null, data)
}

export { register }
