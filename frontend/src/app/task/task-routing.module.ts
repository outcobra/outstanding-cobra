import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TaskComponent} from './task.component';
import {TaskResolver} from './service/task-resolver.service';
import {SchoolClassSubjectResolver} from '../core/services/school-class-subject/school-class-subject-resolver.service';
import {TaskListResolver} from './service/task-list-resolver.service';
import {TaskCreateUpdateComponent} from './task-create-update/task-create-update.component';
import {ViewMode} from '../core/common/view-mode';
import {CurrentSubjectsResolverService} from '../core/services/resolver/current-subjects-resolver.service';

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
                    subjects: CurrentSubjectsResolverService
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
                    subjects: CurrentSubjectsResolverService
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
