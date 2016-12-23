import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TaskComponent} from "./task.component";
import {TaskRoutingModule} from "./task-routing.module";
import {AuthGuard} from "../shared/services/auth/auth-guard.service";
import {MaterialModule} from "@angular/material";

@NgModule({
    imports: [
        CommonModule,
        TaskRoutingModule,
        MaterialModule
    ],
    declarations: [
        TaskComponent
    ],
    providers: [
        AuthGuard
    ]
})
export class TaskModule {
}
