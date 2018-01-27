export const environment = {
    production: true,
    envName: 'prod',
    enableRouteTracing: false,
    api: {
        defaultApiName: 'outcobra',
        apis: [
            {
                name: 'outcobra',
                apiBase: `https://${window.location.host}/backend/api/`,
                authToken: true
            },
            {
                name: 'outcobra_public',
                apiBase: `https://${window.location.host}/backend/`,
                authToken: false
            }
        ]
    },
    auth: {
        google: {
            clientId: '1070281471136-d6siv7l8a3ece1phmmi8stpd8c7h0f4f.apps.googleusercontent.com'
        }
    },
    persistence: {
        basilOptions: {
            namespace: "oc-data"
        },
        tokenLocation: 'id_token',
        profileLocation: 'profile'
    }
};
