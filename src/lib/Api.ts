import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

interface Options {
    headers?: {
        Authorization?: string;
    };
}

const getRequest = async (path: string, jwt: string|null = null, data = {}, options = {}) => {
    options = setAuthorizationHeader(jwt, options);

    const response = await axios.get(createUrl(path), options);
    return response.data;
};

const postRequest = async (path: string, jwt: string|null = null, data = {}, options = {}) => {
    options = setAuthorizationHeader(jwt, options);

    const response = await axios.post(createUrl(path), data, options);
    return response.data;
}

const putRequest = async (path: string, jwt: string|null = null, data = {}, options = {}) => {
    options = setAuthorizationHeader(jwt, options);

    const response = await axios.put(createUrl(path), data, options);
    return response.data;
}

const deleteRequest = async (path: string, jwt: string|null = null, options = {}) => {
    options = setAuthorizationHeader(jwt, options);

    const response = await axios.delete(createUrl(path), options);
    return response.data;
}

const setAuthorizationHeader = (jwt: string|null, options: Options = {}) => {
    if (jwt) {
        options.headers = {
            Authorization: `Bearer: ${jwt}`
        }
    }

    return options;
}

const createUrl = (path: string): string => {
    return API_URL+path+"?XDEBUG_SESSION_START=PHPSTORM";
}

export { getRequest, postRequest, putRequest, deleteRequest }
