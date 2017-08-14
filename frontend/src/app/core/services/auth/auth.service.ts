import {Injectable} from '@angular/core';
import {ConfigService} from '../../config/config.service';
import {tokenNotExpired} from 'angular2-jwt';
import {Router} from '@angular/router';
import {HttpInterceptor} from '../../http/http-interceptor';
import {Util} from '../../util/util';
import {Observable} from 'rxjs/Observable';
import {User} from '../../model/user';
import {TranslateService} from '@ngx-translate/core';
import {NotificationWrapperService} from '../../notifications/notification-wrapper.service';
import {AuthService} from '../../interfaces/auth.service';

declare let Auth0Lock: any;

@Injectable()
export class Auth0AuthService implements AuthService {
    private _auth0Config: any;
    private readonly _defaultRedirectRoute = '/dashboard';
    private _redirectRoute: string;
    private _lock;

    constructor(private _config: ConfigService,
                private _router: Router,
                private _http: HttpInterceptor,
                private _notificationService: NotificationWrapperService,
                private _translateService: TranslateService) {

        this._auth0Config = this._config.get('auth0');

        // auth0 lock configuration
        this._lock = new Auth0Lock(this._auth0Config.clientID, this._auth0Config.domain, {
            auth: {
                redirectUrl: this._auth0Config.callbackURL,
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
         * redirects to the provided _redirectRoute
         */
        this._lock.on('authenticated', (authResult) => {
            localStorage.setItem(this._config.get('locStorage.tokenLocation'), authResult.idToken);
            this._lock.getProfile(authResult.idToken, (err, profile) => {
                localStorage.setItem(this._config.get('locStorage.profileLocation'), JSON.stringify(profile));
            });
            this._http.get<User>('/user/login', 'outcobra')
                .catch(() => {
                    this.logout();
                    this._notificationService.error('i18n.auth.error.title', 'i18n.auth.error.message');
                    return Observable.empty();
                })
                .subscribe((user: User) =>
                    this._notificationService.success(
                        this._translateService.instant('i18n.auth.success.hello') + user.username, 'i18n.auth.success.message'
                    ));
            let redirectRoute = Util.getUrlParam('state');
            if (redirectRoute) {
                this._router.navigate(redirectRoute);
            }
        });
    }

    /**
     * shows the auth0 login _lock
     * but only when the user isn't loggedin already
     * sets the redirectRoute for redirecting after the user has loggedin
     *
     * @param redirectRoute
     */
    public login(redirectRoute: string = this._defaultRedirectRoute) {
        if (!this.isLoggedIn()) {
            this._redirectRoute = redirectRoute;
            this._lock.show({ //TODO language
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
    public logout() {
        localStorage.removeItem(this._config.get('locStorage.tokenLocation'));
        localStorage.removeItem(this._config.get('locStorage.profileLocation'));
        this._router.navigate(['']);
    }

    /**
     * checks whether a not expired valid JWT-Token is stored in the localStorage
     *
     * @returns {boolean}
     */
    public isLoggedIn(): boolean {
        return tokenNotExpired(this._config.get('locStorage.tokenLocation'));
    }

}
