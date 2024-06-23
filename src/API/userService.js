import {getClient} from "./axiosClient";


// const clientInfo = getClientInfo()
// const clientAudioFiles = getClientAudioFiles()

const client = getClient()

export async function deleteUserAccount(userId)
{
    return await client.delete(`users/${userId}`)
}