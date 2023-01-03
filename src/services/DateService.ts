import {getRequest, postRequest} from "../lib/Api";

const addDate = async (jwt: string, data: { date: string, eventId: number }) => {
    return await postRequest('/date/add', jwt, data).catch(err => {
        console.log("ERR", err)
    });
};

const removeDate = async (jwt: string, id: number) => {
    return await getRequest('/date/remove/'+id, jwt).catch(err => {
        console.log("ERR", err)
    });
};

const pickDate = async (jwt: string, data: { date: string, eventId: number }) => {
    return await postRequest('/date/pick', jwt, data).catch(err => {
        console.log("ERR", err)
    });
};

const unpickDate = async (jwt: string, data: { date: string, eventId: number }) => {
    return await postRequest('/date/unpick', jwt, data).catch(err => {
        console.log("ERR", err)
    });
};


const getPickedDates = async (jwt: string, eventId: number) => {
    return await getRequest('/date/get/'+eventId, jwt)
}

export { addDate, removeDate, pickDate, getPickedDates, unpickDate }
