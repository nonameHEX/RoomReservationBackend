import { reactive, ref } from 'vue';
import axios from 'axios';
import * as client from 'openid-client';
import {jwtDecode} from "jwt-decode";
import config from "@/config";


// State for auth
const state = reactive({
    accessToken: null,
    user: null,
    authenticated: false,
});
const error = ref<string | null>(null);
let codeChallenge: string;
let authConfig: client.Configuration;

export function useAuth() {

    const init = async () => {
        const issuerUri = `${config.keycloak.baseUrl}/realms/${config.keycloak.realm}`;
        authConfig = await client.discovery(
            new URL(issuerUri),
            config.keycloak.clientId!,
            undefined,
            undefined,
            { execute: [client.allowInsecureRequests] } // allow running Keycloak on localhost
        );
        console.log(authConfig)
    }

    const login = async () => {
        /**
         * PKCE: The following MUST be generated for every redirect to the
         * authorization_endpoint. You must store the code_verifier and state in the
         * end-user session such that it can be recovered as the user gets redirected
         * from the authorization server back to your application.
         */
        localStorage.setItem('code_verifier', client.randomPKCECodeVerifier())
        codeChallenge = await client.calculatePKCECodeChallenge(localStorage.getItem('code_verifier'))

        let parameters: Record<string, string> = {
            redirect_uri: config.keycloak.redirectUri,
            code_challenge: codeChallenge,
            code_challenge_method: 'S256',
        }

        localStorage.setItem('state', client.randomState())
        parameters.state = localStorage.getItem('state')

        let redirectTo: URL = client.buildAuthorizationUrl(authConfig, parameters)
        window.location.href = redirectTo.href; // Redirect to Keycloak login page
    };

    const logout = async () => {
        // Odstranění uložených údajů o přihlášení
        localStorage.removeItem('access_token');
        localStorage.removeItem('code_verifier');
        localStorage.removeItem('state');

        // Přesměrování na Keycloak logout stránku
        window.location.href = `${config.keycloak.baseUrl}/realms/${config.keycloak.realm}/protocol/openid-connect/logout?redirect_uri=${config.keycloak.redirectUri}`;
    };

    /**
     * Handle the callback after login
     */
    const handleCallback = async (callbackUrl: string) => {
        console.log("pre token call")
        let tokens: client.TokenEndpointResponse = await client.authorizationCodeGrant(
            authConfig,
            new URL(callbackUrl),
            {
                pkceCodeVerifier: localStorage.getItem('code_verifier'),
                expectedState: localStorage.getItem('state'),
            },
        )
        console.log("post token call")
        state.authenticated = true;
        state.accessToken = tokens.access_token;
        state.user = jwtDecode(tokens.access_token);

        console.log('Token:', tokens.access_token);
        console.log('User:', state.user);
    };

    /**
     * Make an authenticated request to the backend
     */
    const authorizedRequest = async (endpoint: string, options = {}) => {
        if (!state.accessToken) {
            error.value = 'Not authenticated';
            throw new Error(error.value);
        }

        const response = await axios({
            url: `${endpoint}`,
            headers: {
                Authorization: `Bearer ${state.accessToken}`,
            },
            ...options,
        });
        return response.data;
    };

    const getUsername = () => {
        return state.user?.['preferred_username']
    };

    const getUserRoles = () => {
        return state.user?.['resource_access']?.[config.keycloak.clientId]?.roles ?? []
    }

    return {
        state,
        error,
        init,
        login,
        logout,
        handleCallback,
        authorizedRequest,
        getUsername
    };
}
