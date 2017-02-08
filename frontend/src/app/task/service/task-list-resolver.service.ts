import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Task} from '../model/Task';
import {Observable} from 'rxjs';
import {TaskService} from './task.service';

@Injectable()
export class TaskListResolver implements Resolve<Task[]> {
    constructor(private taskService: TaskService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task[]>|Promise<Task[]>|Task[] {
        return this.taskService.readAll();
    }

}
