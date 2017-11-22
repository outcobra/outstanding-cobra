import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpInterceptor} from '../../http/http-interceptor';
import {TranslateService} from '@ngx-translate/core';
import {NotificationWrapperService} from '../../notifications/notification-wrapper.service';
import {AuthService} from '../../interfaces/auth.service';
import * as Raven from 'raven-js';
import {IdentityProvider} from './identity-provider';
import {User} from '../../model/user';
import {Observable} from 'rxjs/Observable';
import {UsernamePasswordDto} from '../../../auth/model/username-password.dto';
import {environment} from '../../../../environments/environment';
import {JwtHelperService} from './jwt-helper.service';
import {AuthResponseDto} from './auth-response.dto';

declare let auth0: any;
declare let gapi: any;

@Injectable()
export class Auth0AuthService implements AuthService {
    private _auth0Config: any;
    private readonly _defaultRedirectRoute = '/manage';
    private _webAuth;
    private _googleAuth;

    constructor(private _router: Router,
                private _http: HttpInterceptor,
                private _jwtHelper: JwtHelperService,
                private _notificationService: NotificationWrapperService,
                private _translateService: TranslateService) {

        gapi.load('auth2', () => this._googleAuth = gapi.auth2.init({
                client_id: environment.auth.google.clientId
            })
        );

        this._jwtHelper.isTokenExpired('');

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
            localStorage.setItem(environment.locStorage.tokenLocation, authResult.idToken);
            console.log(authResult);

            this._webAuth.client.userInfo(authResult.accessToken, (err, user) => {
                if (err) {
                    return;
                }
                localStorage.setItem(environment.locStorage.profileLocation, JSON.stringify(user));
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

    /**
     *
     * @param usernamePassword
     */
    public loginWithMailAndPassword(usernamePassword: UsernamePasswordDto): Observable<boolean> {
        if (this.isLoggedIn()) {
            return
        }
        this._http.post<AuthResponseDto>('/api/auth/password', usernamePassword, 'outcobra_public')
            .map(token => this._afterLogin(token));
    }

    public loginIdentityProvider(identityProvider: IdentityProvider): Observable<boolean> {
        if (identityProvider == IdentityProvider.GOOGLE) {
            return Observable.fromPromise(this._googleAuth.signIn())
                .switchMap((user: any) => this._http.post<AuthResponseDto>('/api/auth/google/', user.getAuthResponse().id_token, 'outcobra_public')
                    .map(token => this._afterLogin(token)));
        }
        return Observable.throw(new Error('Identity provider not supported'));
    }

    /**
     * logs the user out and removes the corresponding localStorage items
     *
     * redirects to the home
     */
    public logout() {
        Raven.setUserContext();
        localStorage.removeItem(environment.locStorage.tokenLocation);
        localStorage.removeItem(environment.locStorage.profileLocation);
        this._router.navigate(['']);
    }

    /**
     * checks whether a not expired valid JWT-Token is stored in the localStorage
     *
     * @returns {boolean}
     */
    public isLoggedIn(): boolean {
        return this._jwtHelper.hasToken() && !this._jwtHelper.isTokenExpired();
    }

    private _afterLogin(response: AuthResponseDto): boolean {
        if (!this._jwtHelper.isTokenExpired(response.token)) {
            localStorage.setItem(environment.locStorage.tokenLocation, response.token);
            return true;
        }
        return false;
    }
}

