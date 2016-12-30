import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Task} from "../model/Task";
import {Observable} from "rxjs";
import {TaskService} from "./task.service";
import {NotificationsService} from "angular2-notifications";

@Injectable()
export class TaskResolver implements Resolve<Task> {
    constructor(private taskService: TaskService, private router: Router, private notificationService: NotificationsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task>|Promise<Task>|Task {
        let id: number = route.params['id'];
        return this.taskService.getTaskById(id)
            .map(task => {
                if (task) return task;
                this.router.navigate(['/task']);
                this.notificationService.error('i18n.modules.task.error.taskNotFound.title','i18n.modules.task.error.taskNotFound.message');
                return null;
            });
    }

}
