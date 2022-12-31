import {getRequest, postRequest} from "../lib/Api";

const createEvent = async (jwt: string, data: { title: string }) => {
    const response = await postRequest('/events/create', jwt, data).catch(err => {
        console.log("ERR", err)
    });

    return response.event;
};

const getEvent = async (jwt: string, identifier: string) => {
    return await getRequest(`/events/${identifier}`, jwt).catch(err => {
        console.log("ERR", err)
    });
}

const getAllEvents = async (jwt: string) => {
    return await getRequest(`/events/all`, jwt).catch(err => {
        console.log("ERR", err)
    });
}

export { createEvent, getEvent, getAllEvents }
