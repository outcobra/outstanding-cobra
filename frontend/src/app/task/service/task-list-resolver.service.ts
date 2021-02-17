import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskDto } from '../model/task.dto';
import { TaskService } from './task.service';

@Injectable()
export class TaskListResolver implements Resolve<TaskDto[]> {
  constructor(private _taskService: TaskService) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TaskDto[]> | Promise<TaskDto[]> | TaskDto[] {
    return this._taskService.readAll();
  }

}
