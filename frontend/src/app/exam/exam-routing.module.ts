import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../core/services/auth/auth-guard.service';
import {ExamComponent} from './exam.component';
import {SubjectFilterResolver} from '../core/services/filter/subject.filter.resolver.service';
import {ExamListResolver} from './service/exam-list-resolver.service';
import {ActiveExamListResolver} from './service/active-exam-list-resolver.service';
import {ExamCreateUpdateComponent} from './exam-create-update/exam-create-update.component';
import {ExamResolver} from './service/exam-resolver.service';
import {CurrentSubjectsResolverService} from '../core/services/resolver/current-subjects-resolver.service';
import {ViewMode} from '../core/common/view-mode';

@NgModule({
    imports: [
        RouterModule.forChild([
                {
                    path: '',
                    component: ExamComponent,
                    canActivate: [AuthGuard],
                    resolve: {
                        taskFilter: SubjectFilterResolver,
                        allExams: ExamListResolver,
                        activeExams: ActiveExamListResolver,
                    }
                },
                {
                    path: 'new',
                    component: ExamCreateUpdateComponent,
                    canActivate: [AuthGuard],
                    data: {
                        viewMode: ViewMode.NEW
                    },
                    resolve: {
                        subjects: CurrentSubjectsResolverService
                    }
                },
                {
                    path: 'update/:id',
                    component: ExamCreateUpdateComponent,
                    canActivate: [AuthGuard],
                    data: {
                        viewMode: ViewMode.EDIT
                    },
                    resolve: {
                        exam: ExamResolver,
                        subjects: CurrentSubjectsResolverService
                    }
                }
            ]
        )],
    exports: [
        RouterModule
    ]
})

export class ExamRoutingModule {
}
