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
        return this.http.put<Task>(this.baseUri, task, 'outcobra');
    }

    public readById(id: number): Observable<Task> {
        if (this.hasCache()) {
            let task = this.cache.find(task => task.id == id);
            if (task) return Observable.of(task);
        }
        return this.http.get<Task>(`${this.baseUri}/${id}`, 'outcobra');
    }

    public readAll(): Observable<Task[]> {
        if (this.hasCache()) return Observable.of(this.cache);
        else if (this.observable) return this.observable;
        return this.saveObservable(this.http.get<Task[]>(this.baseUri, 'outcobra')
            .map((res: Task[]) => {
                this.clearObservable();
                this.saveCache(res);
                return this.cache;
            }).share()
        );
    }

    deleteById(id: number): Observable<any> {
        return this.http.delete(`${this.baseUri}/${id}`, 'outcobra');
    }

    update(task: Task): Observable<Task> {
        return this.http.post<Task>(this.baseUri, task, 'outcobra');
    }

    getTaskFilter(): Observable<TaskFilter> {
        return this.http.get<TaskFilter>(`${this.baseUri}/filter`, 'outcobra');
    }
}
