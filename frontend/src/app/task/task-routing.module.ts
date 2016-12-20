import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../shared/services/auth/auth-guard.service";
import {TaskComponent} from "./task.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'task',
                component: TaskComponent,
                canActivate: [AuthGuard]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class TaskRoutingModule {
}
