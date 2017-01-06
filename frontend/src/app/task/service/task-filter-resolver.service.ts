import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {TaskFilter} from "../model/TaskFilter";
import {Observable} from "rxjs";
import {SchoolClassService} from "../../manage/service/school-class.service";
import {SubjectService} from "../../manage/service/subject.service";
import {CacheableService} from "../../shared/services/core/cacheable.service";

@Injectable()
export class TaskFilterResolver extends CacheableService<TaskFilter> implements Resolve<TaskFilter> {
    constructor(private schoolClassService: SchoolClassService,
                private subjectService: SubjectService) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TaskFilter>|Promise<TaskFilter>|TaskFilter {
        if (this.hasCache()) return Observable.of(this.cache[0]);
        return this.schoolClassService.getAll()
            .flatMap(schoolClasses => {
                 return this.subjectService.getAll()
                     .map(subjects => {
                         let taskFilter: TaskFilter = {
                             schoolClasses,
                             subjects
                         };
                         this.saveCache([taskFilter]);
                         return taskFilter;
                     })
            });
    }

}
