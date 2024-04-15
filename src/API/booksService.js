import {getClient} from "./axiosClient";


// const clientInfo = getClientInfo()
// const clientAudioFiles = getClientAudioFiles()

const client = getClient()

export async function getBooks()
{
    //return await clientInfo.get('audiobooks');
    return await client.get('audiobooks');
}

export async function getBook(id)
{
    //return await clientInfo.get(`audiobooks/${id}`);
    return await client.get(`audiobooks/${id}`);
}

export async function getBookAudio(id)
{
    //return await clientAudioFiles.get(`audiobooks/${id}/audio`);
    return await client.get(`audiobooks/${id}/audio`);
}

export async function uploadBook(book)
{
    // return await clientInfo.post('audiobooks', book, {
    //     timeout: 360_000 // 6 minutes
    // });

    return await client.post('audiobooks', book, {
        timeout: 360_000 // 6 minutes
    });
}

export async function deleteBook(id)
{
    //return await clientInfo.delete(`audiobooks/${id}`);
    return await client.delete(`audiobooks/${id}`);
}