import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { CacheableCrudService } from '../../core/services/core/cacheable-crud.service';
import { TaskProgressUpdateDto } from '../model/task-update-progress.dto';
import { TaskDto } from '../model/task.dto';

@Injectable()
export class TaskService extends CacheableCrudService<TaskDto, TaskDto[]> {
  constructor(http: HttpClient) {
    super(http, '/api/task');
  }

  public readById(id: number): Observable<TaskDto> {
    if (this.hasCache()) {
      let task = this.cache.find(task => task.id == id);
      if (task) return observableOf(task);
    }
    return super.readById(id);
  }

  public readAll(): Observable<TaskDto[]> {
    return this.getFromCacheOrFetch(() => super.readAll());
  }

  public updateProgress(taskId: number, progress: number): Observable<TaskDto> {
    return this._http.post<TaskDto>(`${this._baseUri}/progress`, {
      taskId: taskId,
      progress: progress
    } as TaskProgressUpdateDto);
  }

  public isFinished(task): boolean {
    return task.progress == 100;
  }
}
