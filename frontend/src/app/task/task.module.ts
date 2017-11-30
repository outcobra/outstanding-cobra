import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskComponent} from './task.component';
import {TaskRoutingModule} from './task-routing.module';
import {TaskDetailComponent} from './task-detail-component/task-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TaskCreateUpdateComponent} from './task-create-update/task-create-update.component';
import {SharedModule} from '../shared/shared.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {OCMaterialModule} from '../oc-material.module';
import {PipeModule} from '../shared/pipe.module';
import {TaskListItemHeaderComponent} from './task-list-item-header/task-list-item-header.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TaskRoutingModule,
        OCMaterialModule,
        FlexLayoutModule,
        SharedModule,
        PipeModule
    ],
    declarations: [
        TaskComponent,
        TaskDetailComponent,
        TaskCreateUpdateComponent,
        TaskListItemHeaderComponent
    ],
    entryComponents: [
        TaskCreateUpdateComponent
    ]
})
export class TaskModule {
}
