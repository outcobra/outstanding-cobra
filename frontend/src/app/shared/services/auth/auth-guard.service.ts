import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            this.authService.login(route.url.join(''));
            return false;
        }
    }

}
