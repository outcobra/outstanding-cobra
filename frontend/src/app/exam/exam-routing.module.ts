import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../core/services/auth/auth-guard.service';
import {ExamComponent} from './exam.component';
import {SubjectFilterResolver} from '../core/services/filter/subject.filter.resolver.service';

@NgModule({
    imports: [
        RouterModule.forChild([{
                path: 'exam',
                component: ExamComponent,
            canActivate: [AuthGuard],
            resolve: {
                taskFilter: SubjectFilterResolver,
            }
            }]
        )],
    exports: [
        RouterModule
    ]
})

export class ExamRoutingModule {
}
