import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {TaskFilterDto} from '../model/task-filter.dto';
import {Observable} from 'rxjs';
import {TaskService} from './task.service';

@Injectable()
export class TaskFilterResolver implements Resolve<TaskFilterDto> {
    constructor(private _taskService: TaskService) {
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TaskFilterDto>|Promise<TaskFilterDto>|TaskFilterDto {
        return this._taskService.getTaskFilter();
    }

}
