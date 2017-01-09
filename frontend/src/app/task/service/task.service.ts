import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../../shared/http/HttpInterceptor";
import {Task} from "../model/Task";
import {Observable} from "rxjs";
import {CacheableCrudService} from "../../shared/services/core/cacheable-crud.service";
import {TaskFilter} from "../model/TaskFilter";

@Injectable()
export class TaskService extends CacheableCrudService<Task, Task[]> {
    constructor(http: HttpInterceptor) {
        super(http, '/task');
    }

    public create (task: Task): Observable<Task> {
        return super.create(task);
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

    deleteById(id: number): Observable<any> {
        return super.deleteById(id);
    }

    update(task: Task): Observable<Task> {
        return super.update(task);
    }

    getTaskFilter(): Observable<TaskFilter> {
        return this.http.get<TaskFilter>(`${this.baseUri}/filter`, 'outcobra');
    }
}
