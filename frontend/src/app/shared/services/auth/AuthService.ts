import {Injectable} from "@angular/core";
import {Config} from "../../../config/Config";
import {tokenNotExpired} from "angular2-jwt";
import {NotificationsService} from "angular2-notifications";
import {TranslateService} from "ng2-translate";
import {HttpInterceptor} from "../../http/HttpInterceptor";

declare var Auth0Lock: any;

@Injectable()
export class AuthService {
    private auth0Config: any;
    private readonly supportedLangs: Array<string> = ['de', 'en'];
    lock;

    constructor(private config: Config, private http: HttpInterceptor, private notificationService: NotificationsService, private translateService: TranslateService) {
        this.auth0Config = this.config.get('auth0');

        this.lock = new Auth0Lock(this.auth0Config.clientID, this.auth0Config.domain, {
            auth: {
                redirectUrl: this.auth0Config.callbackURL,
                responseType: 'token'
            },
            rememberLastLogin: false,
            allowForgotPassword: false,
            loginAfterSignUp: true,
            additionalSignUpFields: [{
                name: 'name',
                placeholder: 'Enter your username'
            }],
            theme: {
                logo: 'https://avatars0.githubusercontent.com/u/22800787?v=3&s=200',
                primaryColor: '#3f51b5'
            }
        });


        this.lock.on('authenticated', (authResult) => {
            this.lock.getProfile(authResult.idToken, (err, profile) => {
                localStorage.setItem(this.config.get('locStorage.tokenLocation'), authResult.idToken);
                localStorage.setItem(this.config.get('locStorage.profileLocation'), JSON.stringify(profile));
            });
        });
    }

    login() {
        if (!this.isLoggedIn()) {
            this.lock.show({ //TODO language and save to our db
                language: "de"
            });
        }
    }

    logout() {
        localStorage.removeItem(this.config.get('locStorage.tokenLocation'));
        localStorage.removeItem(this.config.get('locStorage.profileLocation'));
    }


    isLoggedIn(): boolean {
        return tokenNotExpired();
    }

}
