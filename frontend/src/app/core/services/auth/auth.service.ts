import {Injectable} from '@angular/core';
import {ConfigService} from '../../config/config.service';
import {tokenNotExpired} from 'angular2-jwt';
import {Router} from '@angular/router';
import {HttpInterceptor} from '../../http/http-interceptor';
import {TranslateService} from '@ngx-translate/core';
import {NotificationWrapperService} from '../../notifications/notification-wrapper.service';
import {AuthService} from '../../interfaces/auth.service';
import * as Raven from 'raven-js';
import {WebAuth} from 'auth0-js';
import {IdentityProvider} from './identity-provider';
import {User} from '../../model/user';
import {Observable} from 'rxjs/Observable';
import {UsernamePasswordDto} from '../../../auth/model/username-password.dto';

declare let auth0: any;
declare let gapi: any;

@Injectable()
export class Auth0AuthService implements AuthService {
    private _auth0Config: any;
    private readonly _defaultRedirectRoute = '/manage';
    private _webAuth;
    private _googleAuth;

    constructor(private _config: ConfigService,
                private _router: Router,
                private _http: HttpInterceptor,
                private _notificationService: NotificationWrapperService,
                private _translateService: TranslateService) {

        this._auth0Config = this._config.get('auth0');

        this._webAuth = new WebAuth({
            domain: this._auth0Config.domain,
            clientID: this._auth0Config.clientID
        });

        gapi.load('auth2', () => this._googleAuth = gapi.auth2.init({
                client_id: this._config.get('auth.google.clientId')
            })
        );

        // auth0 lock configuration
        /*this._lock = new Auth0Lock(this._auth0Config.clientID, this._auth0Config.domain, {
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
        });*/

        /*
         * handles the authResult when the user logs in correctly
         * sets the needed localStorage items
         *
         * redirects to the provided _redirectRoute
         */
        /*this._lock.on('authenticated', (authResult) => {
            localStorage.setItem(this._config.get('locStorage.tokenLocation'), authResult.idToken);
            this._lock.getProfile(authResult.idToken, (err, profile) => {
                localStorage.setItem(this._config.get('locStorage.profileLocation'), JSON.stringify(profile));

                this._http.get<User>('/user/login', 'outcobra')
                    .catch(() => {
                        this.logout();
                        this._notificationService.error('i18n.auth.error.title', 'i18n.auth.error.message');
                        return Observable.empty();
                    })
                    .subscribe((user: User) => {
                            this._notificationService.success(
                                this._translateService.instant('i18n.auth.success.hello') + user.username, 'i18n.auth.success.message');
                            if (authResult.state) {
                                this._router.navigate([authResult.state]);
                            }

                            Raven.setUserContext({
                                id: user.auth0Id,
                                username: user.username
                            });
                        }
                    );
            });
        });*/
    }

    public authenticate(urlFragment: string) {
        this._webAuth.parseHash({hash: urlFragment}, (error, authResult) => {
            if (error) {
                console.log(error);
                Raven.captureMessage('Login failed');
                return;
            }
            localStorage.setItem(this._config.get('locStorage.tokenLocation'), authResult.idToken);
            console.log(authResult);

            this._webAuth.client.userInfo(authResult.accessToken, (err, user) => {
                if (err) {
                    return;
                }
                localStorage.setItem(this._config.get('locStorage.profileLocation'), JSON.stringify(user));
                console.log(user);
            });

            this._http.get<User>('/user/login')
                .catch(() => {
                    this.logout();
                    this._notificationService.error('i18n.auth.error.title', 'i18n.auth.error.message');
                    return Observable.empty();
                })
                .subscribe((user: User) => {
                        this._notificationService.success(
                            this._translateService.instant('i18n.auth.success.hello') + user.username, 'i18n.auth.success.message');
                        if (authResult.state) {
                            this._router.navigate([authResult.state]);
                        }

                        Raven.setUserContext({
                            id: user.auth0Id,
                            username: user.username
                        });
                    }
                );
        });
    }

    public login(x = '') {
    }

    public signUpWithMailAndPassword(usernamePassword: UsernamePasswordDto) {
        if (this.isLoggedIn()) {
            return;
        }
        this._http.post('/api/auth/password', usernamePassword, 'outcobra_public')
            .subscribe(console.log);
    }

    /**
     * shows the auth0 login _lock
     * but only when the user isn't loggedin already
     * sets the redirectRoute for redirecting after the user has loggedin
     *
     * @param usernamePassword
     */
    public loginWithMailAndPassword(usernamePassword: UsernamePasswordDto) {
        if (this.isLoggedIn()) {
            return
        }
        this._http.post('/api/auth/password', usernamePassword, 'outcobra_public')
            .subscribe(console.log);
    }

    public loginIdentityProvider(identityProvider: IdentityProvider) {
        if (identityProvider == IdentityProvider.GOOGLE) {
            this._googleAuth.signIn().then(user => {
                console.log(user.getAuthResponse().id_token);
                this._http.post('/api/auth/google/', user.getAuthResponse().id_token, 'outcobra_public').subscribe();

            });
        } else {
            this._webAuth.authorize({
                responseType: 'token id_token',
                redirectUri: this._auth0Config.callbackURL,
                connection: identityProvider
            });
        }
    }

    /**
     * logs the user out and removes the corresponding localStorage items
     *
     * redirects to the home
     */
    public logout() {
        Raven.setUserContext();
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

