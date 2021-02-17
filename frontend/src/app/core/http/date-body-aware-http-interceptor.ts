import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Util } from '../util/util';

@Injectable()
export class DateBodyAwareHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      body: DateBodyAwareHttpInterceptor._replaceDate(req.body, req.headers)
    });
    return next.handle(req);
  }

  private static _replaceDate(body: any, headers: HttpHeaders) {
    if (!headers.has('Content-Type') || headers.getAll('Content-Type').indexOf('application/json') >= 0) {
      return Util.clone(body);
    }
    return body;
  }
}
