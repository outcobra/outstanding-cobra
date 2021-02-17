import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewMode } from '../core/common/view-mode';
import { SchoolClassSubjectResolver } from '../core/services/school-class-subject/school-class-subject-resolver.service';
import { ExamCreateUpdateComponent } from './exam-create-update/exam-create-update.component';
import { ExamComponent } from './exam.component';
import { ActiveExamListResolver } from './service/active-exam-list-resolver.service';
import { ExamListResolver } from './service/exam-list-resolver.service';
import { ExamResolver } from './service/exam-resolver.service';

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
            schoolClassSubjects: SchoolClassSubjectResolver,
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
            subjects: SchoolClassSubjectResolver
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
            subjects: SchoolClassSubjectResolver
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
