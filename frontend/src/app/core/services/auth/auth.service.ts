
import {throwError as observableThrowError, of as observableOf, Observable} from 'rxjs';

import {map} from 'rxjs/operators';
import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../interfaces/auth.service';
import * as Raven from 'raven-js';
import {IdentityProvider} from './identity-provider';
import {UsernamePasswordDto} from '../../../auth/model/username-password.dto';
import {environment} from '../../../../environments/environment';
import {JwtHelperService} from './jwt-helper.service';
import {AuthResponseDto} from './auth-response.dto';
import {BasilWrapperService} from '../../persistence/basil-wrapper.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IdTokenDto} from "./id-token.dto";

@Injectable()
export class DefaultAuthService implements AuthService {
    constructor(private _router: Router,
                private _ngZone: NgZone,
                private _http: HttpClient,
                private _jwtHelper: JwtHelperService,
                private _basil: BasilWrapperService) {
    }

    public loginWithMailAndPassword(usernamePassword: UsernamePasswordDto): Observable<boolean> {
        return this._handleUsernamePasswordAuth(usernamePassword, false);
    }

    public signUpWithMailAndPassword(usernamePassword: UsernamePasswordDto): Observable<boolean> {
        return this._handleUsernamePasswordAuth(usernamePassword, true);
    }

    public loginIdentityProvider(identityProvider: IdentityProvider, token: string): Observable<boolean> {
        return this._handleIdentityProviderAuth(identityProvider, false, token);
    }

    public signUpIdentityProvider(identityProvider: IdentityProvider, token: string): Observable<boolean> {
        return this._handleIdentityProviderAuth(identityProvider, true, token);
    }

    public logout() {
        Raven.setUserContext();
        this._basil.remove(environment.persistence.tokenLocation);
        this._basil.remove(environment.persistence.profileLocation);
        this._router.navigate(['']);
    }

    public getToken() {
        return this._jwtHelper.getToken();
    }

    public isLoggedIn(): boolean {
        return this._jwtHelper.hasToken() && !this._jwtHelper.isTokenExpired();
    }

    private _afterLogin(response: AuthResponseDto): boolean {
        if (!this._jwtHelper.isTokenExpired(response.token)) {
            this._basil.set(environment.persistence.tokenLocation, response.token);
            return true;
        }
        return false;
    }

    private _handleUsernamePasswordAuth(usernamePassword: UsernamePasswordDto, isSignUp: boolean): Observable<boolean> {
        this._removeTokenIfExpired();
        if (this.isLoggedIn()) {
            return observableOf(true);
        }
        return this._http.post<AuthResponseDto>(`/api/auth/${isSignUp ? 'signUp' : 'login'}`, usernamePassword).pipe(
            map(token => this._afterLogin(token)));
    }

    private _handleIdentityProviderAuth(identityProvider: IdentityProvider, isSignUp: boolean, token: string): Observable<boolean> {
        this._removeTokenIfExpired();
        if (this.isLoggedIn()) {
            return observableOf(true);
        }
        if (identityProvider == IdentityProvider.GOOGLE) {
            return this._http.post<AuthResponseDto>(`/api/auth/${isSignUp ? 'signUp' : 'login'}/google/`, <IdTokenDto>{idToken: token}, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(
                map(token => this._afterLogin(token)));
        }
        return observableThrowError(new Error('Identity provider not supported'));
    }

    private _removeTokenIfExpired() {
        if (this._jwtHelper.isTokenExpired()) {
            this._basil.remove(environment.persistence.tokenLocation);
        }
    }
}

