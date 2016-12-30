import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../shared/services/auth/auth-guard.service";
import {TaskComponent} from "./task.component";
import {TaskDetailComponent} from "./task-detail-component/task-detail.component";
import {TaskResolver} from "./service/task-resolver.service";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'task',
                component: TaskComponent,
                canActivate: [AuthGuard],
                children: [
                    {
                        path: ':id',
                        component: TaskDetailComponent,
                        resolve: {
                            task: TaskResolver
                        }
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class TaskRoutingModule {
}
