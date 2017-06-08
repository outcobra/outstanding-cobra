import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Auth0AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _authService: Auth0AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this._authService.isLoggedIn()) {
            return true;
        } else {
            this._authService.login(state.url);
            return false;
        }
    }

}
