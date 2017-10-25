import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../core/services/auth/auth-guard.service';
import {ExamComponent} from './exam.component';
import {SubjectFilterResolver} from '../core/services/school-class-subject/school-class-subject-resolver.service';
import {ExamListResolver} from './service/exam.list.resolver.service';
import {ActiveExamListResolver} from './service/active.exam.list.resolver.service';

@NgModule({
    imports: [
        RouterModule.forChild([{
                path: 'exam',
                component: ExamComponent,
            canActivate: [AuthGuard],
            resolve: {
                taskFilter: SubjectFilterResolver,
                allExams: ExamListResolver,
                activeExams: ActiveExamListResolver,
            }
            }]
        )],
    exports: [
        RouterModule
    ]
})

export class ExamRoutingModule {
}
