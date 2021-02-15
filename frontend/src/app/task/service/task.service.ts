
import {of as observableOf, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {TaskDto} from '../model/task.dto';
import {CacheableCrudService} from '../../core/services/core/cacheable-crud.service';
import {TaskProgressUpdateDto} from '../model/task-update-progress.dto';
import {HttpClient} from '@angular/common/http';

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
