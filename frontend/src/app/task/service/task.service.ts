import {Injectable} from "@angular/core";
import {HttpInterceptor} from "../../shared/http/HttpInterceptor";
import {Task} from "../model/Task";
import {Observable} from "rxjs";

@Injectable()
export class TaskService {
    constructor(private http: HttpInterceptor) {}

    public getAllTasks(): Observable<Task[]> {
        return this.http.get<Task[]>('/task', 'outcobra');
    }
}
