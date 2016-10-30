import {Injectable} from "@angular/core";
import {Config} from "../../../config/Config";
import {tokenNotExpired} from "angular2-jwt";
import {NotificationsService} from "angular2-notifications";

declare var Auth0Lock: any;

@Injectable()
export class AuthService {
    private auth0Config: any;

    lock;

    constructor(private config: Config, private notificationService: NotificationsService) {
        this.auth0Config = config.get('auth0');

        this.lock = new Auth0Lock(this.auth0Config.clientID, this.auth0Config.domain, {
            auth: {
                redirectUrl: this.auth0Config.callbackURL,
                responseType: 'token'
            }
        });


        this.lock.on('authenticated', function (authResult) {
            console.log(authResult);
        });
    }

    login() {
        this.lock.show();
    }

    logout() {
        localStorage.removeItem(this.config.get('tokenLocation'));
    }


    isLoggedIn(): boolean {
        return tokenNotExpired();
    }

}
