import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {TaskFilter} from '../model/task-filter.dto';
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
