import axios from "axios";
import getGlobalConfig from "../globalConfig";

export function getClient()
{
    return client;
}

const client = axios.create({
    baseURL: 'https://api.nvalchanov.nl/api/'
})

// Adds access tokens in all api requests
// this interceptor is only added when the auth0 instance is ready and exports the getAccessTokenSilently method
export const addAccessTokenInterceptor = (getAccessTokenSilently) => {
    client.interceptors.request.use(async (config) => {
        try {
            const token = await getAccessTokenSilently();
            config.headers.Authorization = `Bearer ${token}`;
        }
        catch(ex) {
            console.warn("An error occurred while appending Bearer token to the request: " + ex);
        }
        return config;
    });
};
