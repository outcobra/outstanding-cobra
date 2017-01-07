import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {TaskFilter} from "../model/TaskFilter";
import {Observable} from "rxjs";
import {SchoolClassService} from "../../manage/service/school-class.service";
import {SubjectService} from "../../manage/service/subject.service";
import {CacheableService} from "../../shared/services/core/cacheable.service";
import {TaskService} from "./task.service";

@Injectable()
export class TaskFilterResolver extends CacheableService<TaskFilter> implements Resolve<TaskFilter> {
    constructor(private taskService: TaskService) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TaskFilter>|Promise<TaskFilter>|TaskFilter {
        if (this.hasCache()) return Observable.of(this.cache);
        if (this.observable) return this.observable;
        return this.saveObservable(this.taskService.getTaskFilter()
            .map(taskFilter => {
                this.clearObservable();
                this.saveCache(taskFilter);
                return this.cache;
            }).share());
    }

}
