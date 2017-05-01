import {Injectable} from '@angular/core';
import {Config} from '../../../config/Config';

@Injectable()
export class MockConfig extends Config {
    constructor() {
        super(null);
        this.config = {
            api: {
                defaultApiName: 'outcobra',
                apis: [
                    {
                        name: 'outcobra',
                        apiBase: 'http://localhost:8080/api/',
                        authToken: true
                    },
                    {
                        name: 'outcobra_public',
                        apiBase: 'http://localhost:8080/',
                        authToken: false
                    }
                ]
            },
            auth0: {
                clientID: 'Qih42aYQMS2CGCAqNkgalzFdIyacqi5r',
                domain: 'outcobra.eu.auth0.com',
                callbackURL: 'http://localhost:4200/'
            },
            locStorage: {
                tokenLocation: 'id_token',
                profileLocation: 'profile'
            }
        };
    }
}
