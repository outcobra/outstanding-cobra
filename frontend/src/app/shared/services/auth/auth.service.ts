import {Injectable} from '@angular/core';
import {Config} from '../../../config/Config';
import {tokenNotExpired} from 'angular2-jwt';
import {Router} from '@angular/router';
import {HttpInterceptor} from '../../http/HttpInterceptor';
import {Util} from '../../util/util';
import {NotificationsService} from 'angular2-notifications';
import {Observable} from 'rxjs';
import {User} from '../../model/User';
import {TranslateService} from '@ngx-translate/core';

declare let Auth0Lock: any;

@Injectable()
export class AuthService {
    private auth0Config: any;
    private readonly defaultRedirectRoute = '/dashboard';
    private redirectRoute: string;
    lock;

    constructor(private config: Config,
                private router: Router,
                private http: HttpInterceptor,
                private notificationService: NotificationsService,
                private translateService: TranslateService) {

        this.auth0Config = this.config.get('auth0');

        // auth0 lock configuration
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
                title: 'Outcobra'
            }
        });

        /*
         * handles the authResult when the user logs in correctly
         * sets the needed localStorage items
         *
         * redirects to the provided redirectRoute
         */
        this.lock.on('authenticated', (authResult) => {
            localStorage.setItem(this.config.get('locStorage.tokenLocation'), authResult.idToken);
            this.lock.getProfile(authResult.idToken, (err, profile) => {
                localStorage.setItem(this.config.get('locStorage.profileLocation'), JSON.stringify(profile));
            });
            this.http.get<User>('/user/login', 'outcobra')
                .catch(() => {
                    this.logout();
                    this.notificationService.error('i18n.login.error.title', 'i18n.login.error.message');
                    return Observable.empty();
                })
                .subscribe((user: User) =>
                    this.notificationService.success(
                        this.translateService.instant('i18n.login.success.hello') + user.username, 'i18n.login.success.message'
                    ));
            let redirectRoute = Util.getUrlParam('state');
            if (redirectRoute) {
                this.router.navigate(redirectRoute);
            }
        });
    }

    /**
     * shows the auth0 login lock
     * but only when the user isn't loggedin already
     * sets the redirectRoute for redirecting after the user has loggedin
     *
     * @param redirectRoute
     */
    login(redirectRoute: string = this.defaultRedirectRoute) {
        if (!this.isLoggedIn()) {
            this.redirectRoute = redirectRoute;
            this.lock.show({ //TODO language
                auth: {
                    params: {
                        state: redirectRoute
                    }
                },
                language: 'de'
            });
        }
    }

    /**
     * logs the user out and removes the corresponding localStorage items
     *
     * redirects to the home
     */
    logout() {
        localStorage.removeItem(this.config.get('locStorage.tokenLocation'));
        localStorage.removeItem(this.config.get('locStorage.profileLocation'));
        this.router.navigate(['']);
    }

    /**
     * checks whether a not expired valid JWT-Token is stored in the localStorage
     *
     * @returns {boolean}
     */
    isLoggedIn(): boolean {
        return tokenNotExpired(this.config.get('locStorage.tokenLocation'));
    }

}
