// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    envName: 'fire',
    enableRouteTracing: false,
    api: {
        apiBase: 'https://staging.outcobra.school/backend',
        blackList: [
            '/assets'
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
