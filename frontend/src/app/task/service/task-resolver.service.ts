import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { HttpStatus } from '../../core/http/http-status';
import { NotificationWrapperService } from '../../core/notifications/notification-wrapper.service';
import { TaskDto } from '../model/task.dto';
import { TaskService } from './task.service';

@Injectable()
export class TaskResolver implements Resolve<TaskDto> {
  constructor(private _taskService: TaskService, private _router: Router, private _notificationService: NotificationWrapperService) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TaskDto> | Promise<TaskDto> | TaskDto {
    let id: number = route.params['id'];
    return this._taskService.readById(id).pipe(
      catchError(error => {
        if (error.status == HttpStatus.NOT_FOUND) {
          this._notificationService.remove();
          this._router.navigate(['/task']).then(() =>
            this._notificationService.error('i18n.modules.task.notification.error.taskNotFound.title', 'i18n.modules.task.notification.error.taskNotFound.message')
          );
        }
        return observableOf(null);
      }));
  }

}
