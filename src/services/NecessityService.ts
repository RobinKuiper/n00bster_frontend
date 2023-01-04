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
}

export default NecessityService;
