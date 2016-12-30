import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../../shared/http/HttpInterceptor";
import {Task} from "../model/Task";
import {Observable} from "rxjs";
import {Cacheable} from "../../shared/interfaces/Cacheable";
import {Util} from "../../shared/services/util";

@Injectable()
export class TaskService implements Cacheable<Task[]> {
    expiration: number;
    observable: Observable<Task[]>;
    cache: Task[];

    constructor(private http: HttpInterceptor) {
    }

    public getTaskById(id: number): Observable<Task> {
        if (this.hasCache()) {
            let task = this.cache.find(task => task.id == id);
            console.log(task);
            if (task) return Observable.of(task);
        }
        return this.http.get<Task>(`/task/${id}`, 'outcobra');
    }

    public getAllTasks(): Observable<Task[]> {
        if (this.hasCache()) return Observable.of(this.cache);
        else if (this.observable) return this.observable;
        return this.saveObservable(this.http.get<Task[]>('/task', 'outcobra')
            .map((res: Task[]) => {
                this.clearObservable();
                this.saveCache(res);
                return this.cache;
            }).share()
        );
    }

    hasCache(): boolean {
        return this.cache && this.expiration && Util.getMillis() - this.expiration <= 600000; // cache not older than 10 minutes TODO other?
    }

    saveObservable(observable: Observable<Task[]>): Observable<Task[]> {
        return this.observable = observable;
    }

    saveCache(tasks: Task[]): void {
        this.cache = tasks;
        console.log('abcdefg');
        this.expiration = Util.getMillis();
    }

    clearCache(): void {
        this.cache = null;
    }

    clearObservable(): void {
        this.observable = null;
    }
}
