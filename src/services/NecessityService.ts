import {getRequest, postRequest} from "../lib/Api";

const addNecessity = async (jwt: string, data: { name: string, eventId: number, amount: number }) => {
    return await postRequest('/necessity/add', jwt, data).catch(err => {
        console.log("ERR", err)
    });
};

const removeNecessity = async (jwt: string, id: number) => {
    return await getRequest('/necessity/remove/'+id, jwt).catch(err => {
        console.log("ERR", err)
    });
};

export { addNecessity, removeNecessity }
