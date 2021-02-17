import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class UrlPrefixingHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!environment.api.blackList.some(entry => req.url.startsWith(entry))) {
      req = req.clone({
        url: environment.api.apiBase + req.url
      });
    }
    return next.handle(req);
  }
}
