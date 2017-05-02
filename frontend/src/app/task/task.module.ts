import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskComponent} from './task.component';
import {TaskRoutingModule} from './task-routing.module';
import {AuthGuard} from '../shared/services/auth/auth-guard.service';
import {MaterialModule} from '@angular/material';
import {TaskListItemComponent} from './task-list-item/task-list-item.component';
import {TaskDetailComponent} from './task-detail-component/task-detail.component';
import {TaskDetailResolver} from './service/task-detail-resolver.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TaskListResolver} from './service/task-list-resolver.service';
import {TaskFilterResolver} from './service/task-filter-resolver.service';
import {TaskCreateUpdateDialog} from './task-create-update-dialog/task-create-update-dialog.component';
import {SharedModule} from '../shared/shared.module';
import {TaskService} from './service/task.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TaskRoutingModule,
        MaterialModule,
        SharedModule
    ],
    declarations: [
        TaskComponent,
        TaskListItemComponent,
        TaskDetailComponent,
        TaskCreateUpdateDialog
    ],
    providers: [
        AuthGuard,
        TaskService,
        TaskDetailResolver,
        TaskListResolver,
        TaskFilterResolver
    ],
    entryComponents: [
        TaskCreateUpdateDialog
    ]
})
export class TaskModule {
}
