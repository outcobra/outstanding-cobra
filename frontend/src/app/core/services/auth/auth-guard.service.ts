import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import {DefaultAuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private _authService: DefaultAuthService,
                private _router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this._checkUserLoggedIn(state);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this._checkUserLoggedIn(state);
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        return this._checkUserLoggedIn();
    }

    private _checkUserLoggedIn(state?: RouterStateSnapshot): boolean {
        if (this._authService.isLoggedIn()) {
            return true;
        } else {
            this._router.navigate(['/login'], {
                queryParams: {
                    target: state ? state.url : location.pathname
                }
            });
            return false;
        }
    }
}
