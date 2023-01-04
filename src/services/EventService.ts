import {getRequest, postRequest} from "../lib/Api";

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
    }
}

export default EventService;
