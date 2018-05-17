import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {isNotEmpty} from '../util/helper';
import {DefaultAuthService} from '../services/auth/auth.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    constructor(private _authService: DefaultAuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this._authService.getToken();
        if (isNotEmpty(token)) {
            req = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }

        return next.handle(req);
    }
}
