import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OCMaterialModule } from '../oc-material.module';
import { PipeModule } from '../shared/pipe.module';
import { SharedModule } from '../shared/shared.module';
import { TaskCreateUpdateComponent } from './task-create-update/task-create-update.component';
import { TaskDetailComponent } from './task-detail-component/task-detail.component';
import { TaskListItemHeaderComponent } from './task-list-item-header/task-list-item-header.component';
import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';

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
  ]
})
export class TaskModule {
}
