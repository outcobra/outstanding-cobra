import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewMode } from '../core/common/view-mode';
import { SchoolClassSubjectResolver } from '../core/services/school-class-subject/school-class-subject-resolver.service';
import { TaskListResolver } from './service/task-list-resolver.service';
import { TaskResolver } from './service/task-resolver.service';
import { TaskCreateUpdateComponent } from './task-create-update/task-create-update.component';
import { TaskComponent } from './task.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TaskComponent,
        data: {
          animation: 'task'
        },
        resolve: {
          schoolClassSubjects: SchoolClassSubjectResolver,
          tasks: TaskListResolver
        }
      },
      {
        path: 'new',
        component: TaskCreateUpdateComponent,
        data: {
          viewMode: ViewMode.NEW,
          animation: 'taskCreateUpdate'
        },
        resolve: {
          subjects: SchoolClassSubjectResolver
        }
      },
      {
        path: 'update/:id',
        component: TaskCreateUpdateComponent,
        data: {
          viewMode: ViewMode.EDIT,
          animation: 'taskCreateUpdate'
        },
        resolve: {
          task: TaskResolver,
          subjects: SchoolClassSubjectResolver
        }
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class TaskRoutingModule {
}
