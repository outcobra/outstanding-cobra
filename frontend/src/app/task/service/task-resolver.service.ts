import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {TaskDto} from '../model/task.dto';
import {Observable} from 'rxjs/Observable';
import {TaskService} from './task.service';
import {HttpStatus} from '../../core/http/http-status';
import {NotificationWrapperService} from '../../core/notifications/notification-wrapper.service';

@Injectable()
export class TaskResolver implements Resolve<TaskDto> {
    constructor(private _taskService: TaskService, private _router: Router, private _notificationService: NotificationWrapperService) {
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TaskDto> | Promise<TaskDto> | TaskDto {
        let id: number = route.params['id'];
        return this._taskService.readById(id)
            .catch(error => {
                if (error.status == HttpStatus.NOT_FOUND) {
                    this._notificationService.remove();
                    this._router.navigate(['/task']).then(() =>
                        this._notificationService.error('i18n.modules.task.notification.error.taskNotFound.title', 'i18n.modules.task.notification.error.taskNotFound.message')
                    );
                }
                return Observable.of(null);
            });
    }

}
