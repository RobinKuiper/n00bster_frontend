import {getRequest, postRequest, putRequest} from "../lib/Api";

const EventService = {
    createEvent: async (jwt: string | null, data: { title: string }) => {
        return await postRequest('/events', jwt, data).catch(err => {
            console.log("ERR", err)
        });
    },

    getEvent: async (jwt: string, identifier: string) => {
        return await getRequest(`/events/${identifier}`, jwt).catch(err => {
            console.log("ERR", err)
        });
    },

    joinEvent: async (jwt: string, identifier: string) => {
        return await getRequest(`/events/join/${identifier}`, jwt).catch(err => {
            console.log("ERR", err)
        });
    },

    getAllEvents: async (jwt: string) => {
        return await getRequest(`/events`, jwt).catch(err => {
            console.log("ERR", err)
        });
    },

    updateEvent: async (jwt: string, data: { eventId: number, title: string, description: string }) => {
        return await putRequest(`/events`, jwt, data).catch(err => {
            console.log("ERR", err)
        });
    }
}

export default EventService;
