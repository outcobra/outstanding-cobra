import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Task} from '../model/task.dto';
import {Observable} from 'rxjs';
import {TaskService} from './task.service';

@Injectable()
export class TaskListResolver implements Resolve<Task[]> {
    constructor(private _taskService: TaskService) {
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task[]>|Promise<Task[]>|Task[] {
        return this._taskService.readAll();
    }

}
