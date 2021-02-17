import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationWrapperService } from '../notifications/notification-wrapper.service';
import { isNotEmpty } from '../util/helper';
import { ValidationException } from './validation-exception';

@Injectable()
export class ErrorCatchingHttpInterceptor implements HttpInterceptor {
  constructor(private _notificationService: NotificationWrapperService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError(this._handleError.bind(this) as (error: any) => Observable<HttpEvent<any>>));
  }

  private _handleError(errorResponse: HttpErrorResponse | any): Observable<HttpEvent<any>> {
    let validationException = errorResponse.error as ValidationException;
    if (isNotEmpty(validationException.title) && isNotEmpty(validationException.message)) {
      this._notificationService.error(validationException.title, validationException.message);
      return throwError(validationException);
    } else {
      let status = errorResponse.status;
      this._notificationService.error(`i18n.error.http.${status}.title`, `i18n.error.http.${status}.message`);
      return throwError(errorResponse);
    }
  }
}
