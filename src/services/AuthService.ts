import {getRequest, postRequest, putRequest} from "../lib/Api";

interface RegisterData {
    visitor?: boolean;
    email?: string;
    password?: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface ProfileData {
    displayName: string;
    color: string;
}

const AuthService = {
    register: async (data: RegisterData = {}) => {
        const { visitor } = data;
        let path = '/authentication/register';

        if(visitor){
            path += '/guest';
        }

        return await postRequest(path,null, data)
    },

    login: async (data: LoginData) => {
        let path = '/authentication/login';

        return await postRequest(path,null, data)
    },

    getUserData: async (jwt: string) => {
        let path = '/authentication';

        return await getRequest(path, jwt)
    },

    updateProfileData: async (jwt: string, data: ProfileData) => {
        let path = '/authentication';
        return await putRequest(path, jwt, data);
    },

    updatePassword: async (jwt: string, data: { password: string }) => {
        let path = '/authentication/password';
        return await putRequest(path, jwt, data);
    },

    addCredentials: async (jwt: string, data: { email: string, password: string }) => {
        let path = '/authentication/add_credentials';
        return await putRequest(path, jwt, data);
    },
}

export default AuthService;
