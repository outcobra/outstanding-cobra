import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpInterceptor} from '../../http/http-interceptor';
import {AuthService} from '../../interfaces/auth.service';
import * as Raven from 'raven-js';
import {IdentityProvider} from './identity-provider';
import {Observable} from 'rxjs/Observable';
import {UsernamePasswordDto} from '../../../auth/model/username-password.dto';
import {environment} from '../../../../environments/environment';
import {JwtHelperService} from './jwt-helper.service';
import {AuthResponseDto} from './auth-response.dto';

declare let gapi: any;

@Injectable()
export class DefaultAuthService implements AuthService {
    private _googleAuth;

    constructor(private _router: Router,
                private _http: HttpInterceptor,
                private _jwtHelper: JwtHelperService) {

        gapi.load('auth2', () =>
            this._googleAuth = gapi.auth2.init({
                client_id: environment.auth.google.clientId
            })
        );
    }

    /**
     *
     * @param usernamePassword
     */
    public loginWithMailAndPassword(usernamePassword: UsernamePasswordDto): Observable<boolean> {
        if (this.isLoggedIn()) {
            return Observable.of(true);
        }
        return this._http.post<AuthResponseDto>('/api/auth/password', usernamePassword, 'outcobra_public')
            .map(token => this._afterLogin(token));
    }

    public loginIdentityProvider(identityProvider: IdentityProvider): Observable<boolean> {
        if (identityProvider == IdentityProvider.GOOGLE) {
            return Observable.fromPromise(this._googleAuth.signIn())
                .switchMap((user: any) => this._http.post<AuthResponseDto>('/api/auth/google/', user.getAuthResponse().id_token, 'outcobra_public'))
                .map(token => this._afterLogin(token));
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
        this._router.navigateByUrl('/auth');
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

