import {Injectable} from "@angular/core";
import {Config} from "../../../config/Config";
import {tokenNotExpired} from "angular2-jwt";
import {TranslateService} from "ng2-translate";
import {Router} from "@angular/router";
import {HttpInterceptor} from "../../http/HttpInterceptor";

declare var Auth0Lock: any;

@Injectable()
export class AuthService {
    private auth0Config: any;
    private readonly supportedLangs: Array<string> = ['de', 'en'];
    lock;

    constructor(private config: Config, private router: Router, private http: HttpInterceptor, private translateService: TranslateService) {
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
                placeholder: 'Enter your username' // todo i18n
            }],
            theme: {
                logo: 'https://cdn.peg.nu/sites/outcobra/logo.jpg',
                primaryColor: '#3f51b5'
            },
            languageDictionary: {
                title: "Outcobra"
            }
        });

        this.lock.on('authenticated', (authResult) => {
            localStorage.setItem(this.config.get('locStorage.tokenLocation'), authResult.idToken);
            this.lock.getProfile(authResult.idToken, (err, profile) => {
                localStorage.setItem(this.config.get('locStorage.profileLocation'), JSON.stringify(profile));
            });
            // We need to subscribe here because the request does not get triggered if we don't
            this.http.get('/user/login', 'outcobra').subscribe();
            this.router.navigate(['/dashboard']);
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
        this.router.navigate(['']);
    }


    isLoggedIn(): boolean {
        return tokenNotExpired();
    }

}
