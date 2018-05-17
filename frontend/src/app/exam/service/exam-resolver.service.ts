import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ExamDto} from '../model/exam.dto';
import {Observable, of} from 'rxjs';
import {ExamService} from './exam.service';
import {HttpStatus} from '../../core/http/http-status';
import {NotificationWrapperService} from '../../core/notifications/notification-wrapper.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ExamResolver implements Resolve<ExamDto> {

    constructor(private _examService: ExamService,
                private _notificationService: NotificationWrapperService,
                private _router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ExamDto> | Promise<ExamDto> | ExamDto {
        let id: number = route.params['id'];
        return this._examService.readById(id)
            .pipe(catchError(error => {
                if (error.status == HttpStatus.NOT_FOUND) {
                    this._notificationService.remove();
                    this._router.navigate(['/exam']).then(() =>
                        this._notificationService.error('i18n.modules.exam.notification.error.examNotFound.title', 'i18n.modules.exam.notification.error.examNotFound.message')
                    );
                }
                return of(null);
            }));
    }

}
