import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Task} from '../model/Task';
import {Observable} from 'rxjs';
import {TaskService} from './task.service';
import {NotificationsService} from 'angular2-notifications';
import {HttpStatus} from '../../core/model/HttpStatus';

@Injectable()
export class TaskDetailResolver implements Resolve<Task> {
    constructor(private _taskService: TaskService, private _router: Router, private _notificationService: NotificationsService) {
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task> | Promise<Task> | Task {
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
