import {getRequest, postRequest, deleteRequest} from "../lib/Api";

const DateService = {
    addDate: async (jwt: string, data: { date: string, eventId: number }) => {
        return await postRequest('/date', jwt, data).catch(err => {
            console.log("ERR", err)
        });
    },

    removeDate: async (jwt: string, data: { date: string, eventId: number }) => {
        data.date = data.date.replace(/\//g, "-");
        return await deleteRequest('/date/' + data.eventId + '/' + data.date, jwt).catch(err => {
            console.log("ERR", err)
        });
    },

    pickDate: async (jwt: string, data: { date: string, eventId: number }) => {
        return await postRequest('/date/pick', jwt, data).catch(err => {
            console.log("ERR", err)
        });
    },

    unpickDate: async (jwt: string, data: { date: string, eventId: number }) => {
        return await postRequest('/date/unpick', jwt, data).catch(err => {
            console.log("ERR", err)
        });
    },

    getUsersPickedDates: async (jwt: string, eventId: number) => {
        return await getRequest('/date/user/' + eventId, jwt)
    },

    getAllPickedDates: async (jwt: string, eventId: number) => {
        return await getRequest('/date/all/' + eventId, jwt)
    }
}

export default DateService
