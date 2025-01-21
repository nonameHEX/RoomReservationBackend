export default {
    roomBackendUrl: import.meta.env.VITE_ROOM_BACKEND_URL || 'http://localhost:3000',
    reservationBackendUrl: import.meta.env.VITE_RESERVATION_BACKEND_URL || 'http://localhost:3001',
    notificationBackendUrl: import.meta.env.VITE_NOTIFICATION_BACKEND_URL || 'http://localhost:3002',
    keycloak: {
        baseUrl: import.meta.env.VITE_KEYCLOAK_BASE_URL,
        realm: import.meta.env.VITE_KEYCLOAK_REALM,
        clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
        redirectUri: location.origin + '/login-callback',
    }
}