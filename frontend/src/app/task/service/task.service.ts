import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../../core/http/http-interceptor';
import {Task} from '../model/task.dto';
import {Observable} from 'rxjs';
import {CacheableCrudService} from '../../core/services/core/cacheable-crud.service';
import {TaskFilter} from '../model/task-filter.dto';
import {TaskProgressUpdate} from '../model/task-update.progress.dto';

@Injectable()
export class TaskService extends CacheableCrudService<Task, Task[]> {
    constructor(http: HttpInterceptor) {
        super(http, '/task');
    }

    public readById(id: number): Observable<Task> {
        if (this.hasCache()) {
            let task = this.cache.find(task => task.id == id);
            if (task) return Observable.of(task);
        }
        return super.readById(id);
    }

    public readAll(): Observable<Task[]> {
        if (this.hasCache()) return Observable.of(this.cache);
        else if (this.observable) return this.observable;
        return this.saveObservable(super.readAll()
            .map((res: Task[]) => {
                this.clearObservable();
                this.saveCache(res);
                return this.cache;
            }).share()
        );
    }

    public getTaskFilter(): Observable<TaskFilter> {
        return this._http.get<TaskFilter>(`${this._baseUri}/filter`, 'outcobra');
    }

    public updateProgress(taskId: number, progress: number): Observable<Task> {
        return this._http.post(`${this._baseUri}/progress`, { taskId: taskId, progress: progress } as TaskProgressUpdate);
    }

    public isFinished(task) {
        return task.progress == 100;
    }
}
