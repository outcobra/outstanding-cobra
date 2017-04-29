import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {TaskFilter} from '../model/TaskFilter';
import {Observable} from 'rxjs';
import {TaskService} from './task.service';

@Injectable()
export class TaskFilterResolver implements Resolve<TaskFilter> {
    constructor(private _taskService: TaskService) {
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TaskFilter>|Promise<TaskFilter>|TaskFilter {
        return this._taskService.getTaskFilter();
    }

}
