import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../../core/http/http-interceptor';
import {TaskDto} from '../model/task.dto';
import {Observable} from 'rxjs/Observable';
import {CacheableCrudService} from '../../core/services/core/cacheable-crud.service';
import {TaskProgressUpdateDto} from '../model/task-update-progress.dto';

@Injectable()
export class TaskService extends CacheableCrudService<TaskDto, TaskDto[]> {
    constructor(http: HttpInterceptor) {
        super(http, '/task');
    }

    public readById(id: number): Observable<TaskDto> {
        if (this.hasCache()) {
            let task = this.cache.find(task => task.id == id);
            if (task) return Observable.of(task);
        }
        return super.readById(id);
    }

    public readAll(): Observable<TaskDto[]> {
        if (this.hasCache()) return Observable.of(this.cache);
        else if (this.observable) return this.observable;
        return this.saveObservable(super.readAll()
            .map((res: TaskDto[]) => {
                this.clearObservable();
                this.saveCache(res);
                return this.cache;
            }).share()
        );
    }

    public updateProgress(taskId: number, progress: number): Observable<TaskDto> {
        return this._http.post(`${this._baseUri}/progress`, {
            taskId: taskId,
            progress: progress
        } as TaskProgressUpdateDto);
    }

    public isFinished(task): boolean {
        return task.progress == 100;
    }
}
