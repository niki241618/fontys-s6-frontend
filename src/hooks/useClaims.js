import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import useJwtToken from "./useJwtToken";

export default function useClaims() {
    const [claims, setClaims] = useState();
    const { isLoading: auth0Loading, isAuthenticated } = useAuth0();
    const token = useJwtToken();

    useEffect(() => {
        function extractClaims()
        {
            const userClaims = token.permissions;
            setClaims(userClaims)
        }
        if(!auth0Loading && isAuthenticated && token)
            extractClaims()

    }, [auth0Loading, token, isAuthenticated])

    const hasClaim = (claim) => {

        if(!claims)
            return false

        return claims.includes(claim) || claims.includes(claim + '-all')
    };

    const hasAnyOf = (...anyOf) => {
        return anyOf.some(claim => hasClaim(claim));
    }

    const hasAllOf = (...allOf) => {
        return allOf.every(claim => hasClaim(claim));
    }

    const isLoading = !claims


    return { claims, hasClaim, hasAnyOf, hasAllOf, isLoading };
}