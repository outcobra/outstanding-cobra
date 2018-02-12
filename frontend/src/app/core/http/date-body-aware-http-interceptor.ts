import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {dateReplacer} from './http-util';

@Injectable()
export class DateBodyAwareHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            body: DateBodyAwareHttpInterceptor._serializeBody(req.body, req.headers)
        });
        return next.handle(req);
    }

    private static _serializeBody(body: any, headers: HttpHeaders) {
        if (!headers.has('Content-Type') || headers.getAll('Content-Type').includes('application/json')) {
            return JSON.stringify(body, dateReplacer)
        }
        return body;
    }
}
