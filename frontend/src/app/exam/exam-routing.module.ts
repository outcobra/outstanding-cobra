import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ExamComponent} from './exam.component';
import {SchoolClassSubjectResolver} from '../core/services/school-class-subject/school-class-subject-resolver.service';
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
                    data: {
                        animation: 'exam'
                    },
                    resolve: {
                        examFilter: SchoolClassSubjectResolver,
                        allExams: ExamListResolver,
                        activeExams: ActiveExamListResolver,
                    }
                },
                {
                    path: 'new',
                    component: ExamCreateUpdateComponent,
                    data: {
                        viewMode: ViewMode.NEW,
                        animation: 'examCreateUpdate'
                    },
                    resolve: {
                        subjects: CurrentSubjectsResolverService
                    }
                },
                {
                    path: 'update/:id',
                    component: ExamCreateUpdateComponent,
                    data: {
                        viewMode: ViewMode.EDIT,
                        animation: 'examCreateUpdate'
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
