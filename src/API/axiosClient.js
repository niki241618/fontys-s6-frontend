import axios from "axios";

// export function getClientInfo()
// {
//     return clientBookInfo;
// }
//
// export function getClientAudioFiles()
// {
//     return clientAudioFiles
// }

export function getClient()
{
    return client;
}

const clientBookInfo = axios.create({
    baseURL: 'http://localhost:5209/api/',
    timeout: 5_000
})

const clientAudioFiles = axios.create({
    baseURL: 'http://localhost:5297/api/',
    timeout: 60_000
})

const client = axios.create({

    //baseURL: 'http://localhost:5209/api/',
    baseURL: 'http://localhost/api/'
    // baseURL: 'http://gateway:8080/api/'
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
            console.warn("An error occured while appending Bearer token to the request: " + ex);
        }
        return config;
    });
};