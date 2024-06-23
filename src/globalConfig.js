export default function getGlobalConfig()
{
    return local
    //return staging
    //return production
}

const authConfig = {
    domain: "dev-g26yz87j382wczux.us.auth0.com",
    scope: "openid offline_access",
    clientId: "kuPXABKiu6MksJEfiRVKv0Lg9VRh2U4P",
    audience: "31bb0b6975d949b2b8222582d54b774d",
    redirectUri: "https://nvalchanov.nl/callback"
}

const local = {
    // baseUrl: '', //Currently there is no gateway and the services are called directly
    auth: authConfig
}

const staging = {
    // baseUrl: '', //Currently there is no gateway and the services are called directly
    auth: authConfig
}

const production = {
    // baseUrl: '', //Currently there is no gateway and the services are called directly
    auth: authConfig
}
