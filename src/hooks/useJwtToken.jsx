import {useAuth0} from "@auth0/auth0-react";
import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";

export default function useJwtToken() {
    const [jwtToken, setJwtToken] = useState(null);
    const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();

    useEffect(() => {
        async function decodeToken()
        {
            const accessToken = await getAccessTokenSilently();
            setJwtToken(jwtDecode(accessToken))
        }

        if(!isLoading && isAuthenticated)
            decodeToken()

    }, [getAccessTokenSilently, isLoading, isAuthenticated])

    return jwtToken;
}