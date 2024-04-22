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
    baseURL: 'http://localhost:8080/api/'
})