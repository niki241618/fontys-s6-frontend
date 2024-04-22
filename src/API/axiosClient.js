import axios from "axios";
import getGlobalConfig from "../globalConfig";

export function getClient()
{
    return client;
}

const client = axios.create({
    baseURL: getGlobalConfig().apiUrl
})