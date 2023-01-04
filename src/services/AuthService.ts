import {postRequest} from "../lib/Api";

interface RegisterData {
    visitor?: boolean;
    username?: string;
    password?: string;
}

interface LoginData {
    username: string;
    password: string;
}

const AuthService = {
    register: async (data: RegisterData = {}) => {
        const { visitor } = data;
        let path = '/authentication/register';

        if(visitor){
            path += 'guest';
        }

        return await postRequest(path,null, data)
    },

    login: async (data: LoginData) => {
        let path = '/authentication/login';

        return await postRequest(path,null, data)
    }
}

export default AuthService;
