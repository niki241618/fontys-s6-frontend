import {useNavigate} from "react-router-dom";
import {Auth0Provider} from "@auth0/auth0-react";
import getGlobalConfig from "../globalConfig";

const Auth0ProviderWithNavigate = ({children}) => {

    const navigate = useNavigate();
    const config = getAuthConfig();

    function getAuthConfig() {

        const config = getGlobalConfig().auth
        const audience = config.audience;

        return {
            domain: config.domain,
            clientId: config.clientId,
            scope: config.scope,
            redirectUri: config.redirectUri,
            ...(audience ? { audience } : null),
        };
    }


    const onRedirectCallback = async (appState) => {
        navigate(appState?.returnTo || window.location.pathname);
    };


    const providerConfig = {
        domain: config.domain,
        clientId: config.clientId,
        authorizationParams: {
            redirect_uri: config.redirectUri,
            scope: config.scope,
            ...(config.audience ? { audience: config.audience } : null),
        },
        onRedirectCallback: onRedirectCallback
    };

    return (
        <Auth0Provider {...providerConfig}>
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithNavigate;