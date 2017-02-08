import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskComponent} from './task.component';
import {TaskRoutingModule} from './task-routing.module';
import {AuthGuard} from '../shared/services/auth/auth-guard.service';
import {MaterialModule} from '@angular/material';
import {TaskService} from './service/task.service';
import {TaskListItemComponent} from './task-list-item/task-list-item.component';
import {TaskDetailComponent} from './task-detail-component/task-detail.component';
import {TaskDetailResolver} from './service/task-detail-resolver.service';
import {TranslateModule} from 'ng2-translate';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TaskListResolver} from './service/task-list-resolver.service';
import {TaskFilterResolver} from './service/task-filter-resolver.service';
import {TaskAddDialogComponent} from './task-add-dialog/task-add-dialog.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TaskRoutingModule,
        MaterialModule,
        SharedModule,
        TranslateModule
    ],
    declarations: [
        TaskComponent,
        TaskListItemComponent,
        TaskDetailComponent,
        TaskAddDialogComponent
    ],
    providers: [
        AuthGuard,
        TaskService,
        TaskDetailResolver,
        TaskListResolver,
        TaskFilterResolver
    ],
    entryComponents: [
        TaskAddDialogComponent
    ]
})
export class TaskModule {
}
