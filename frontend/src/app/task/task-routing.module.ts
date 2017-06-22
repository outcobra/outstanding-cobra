import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../core/services/auth/auth-guard.service';
import {TaskComponent} from './task.component';
import {TaskDetailComponent} from './task-detail-component/task-detail.component';
import {TaskDetailResolver} from './service/task-detail-resolver.service';
import {TaskFilterResolver} from './service/task-filter-resolver.service';
import {TaskListResolver} from './service/task-list-resolver.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'task',
                component: TaskComponent,
                canActivate: [AuthGuard],
                resolve: {
                    taskFilter: TaskFilterResolver,
                    tasks: TaskListResolver
                },
                children: [
                    {
                        path: ':id',
                        component: TaskDetailComponent,
                        resolve: {
                            task: TaskDetailResolver
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
