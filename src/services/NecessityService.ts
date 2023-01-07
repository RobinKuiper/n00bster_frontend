import {deleteRequest, postRequest} from "../lib/Api";

const NecessityService = {
    addNecessity: async (jwt: string, data: { name: string, eventId: number, amount: number }) => {
        return await postRequest('/necessity', jwt, data).catch(err => {
            console.log("ERR", err)
        });
    },

    removeNecessity: async (jwt: string, id: number) => {
        return await deleteRequest('/necessity/' + id, jwt).catch(err => {
            console.log("ERR", err)
        });
    },

    pickNecessity: async (jwt: string, data: { necessityId: number }) => {
        return await postRequest('/necessity/pick', jwt, data).catch(err => {
            console.log("ERR", err)
        });
    },

    unpickNecessity: async (jwt: string, data: { necessityId: number }) => {
        return await postRequest('/necessity/unpick', jwt, data).catch(err => {
            console.log("ERR", err)
        });
    },
}

export default NecessityService;
