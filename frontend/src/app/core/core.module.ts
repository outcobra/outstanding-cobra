import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ExamCreateUpdateComponent } from '../exam/exam-create-update/exam-create-update.component';
import { ActiveExamListResolver } from '../exam/service/active-exam-list-resolver.service';
import { ExamListResolver } from '../exam/service/exam-list-resolver.service';
import { ExamResolver } from '../exam/service/exam-resolver.service';
import { ExamTaskService } from '../exam/service/exam-task.service';
import { ExamService } from '../exam/service/exam.service';
import { InstitutionService } from '../manage/service/institution.service';
import { ManageDialogFactory } from '../manage/service/manage-dialog-factory';
import { ManageService } from '../manage/service/manage.service';
import { SchoolClassService } from '../manage/service/school-class.service';
import { SchoolYearService } from '../manage/service/school-year.service';
import { SemesterService } from '../manage/service/semester.service';
import { SubjectService } from '../manage/service/subject.service';
import { MarkGroupResolver } from '../mark/service/mark-group-resolver.service';
import { MarkResolver } from '../mark/service/mark-resolver.service';
import { MarkService } from '../mark/service/mark.service';
import { SemesterMarkResolver } from '../mark/service/semester-mark-resolver.service';
import { SubjectMarkGroupResolver } from '../mark/service/subject-mark-resolver.service';
import { TaskListResolver } from '../task/service/task-list-resolver.service';
import { TaskResolver } from '../task/service/task-resolver.service';
import { TaskService } from '../task/service/task.service';
import { AuthHttpInterceptor } from './http/auth-http-interceptor';
import { DateBodyAwareHttpInterceptor } from './http/date-body-aware-http-interceptor';
import { ErrorCatchingHttpInterceptor } from './http/error-catching-http-interceptor';
import { UrlPrefixingHttpInterceptor } from './http/url-prefixing-http-interceptor';
import { NotificationWrapperService } from './notifications/notification-wrapper.service';
import { BasilWrapperService } from './persistence/basil-wrapper.service';
import { AuthGuard } from './services/auth/auth-guard.service';
import { DefaultAuthService } from './services/auth/auth.service';
import { JwtHelperService } from './services/auth/jwt-helper.service';
import { ColorService } from './services/color.service';
import { ConfirmDialogService } from './services/confirm-dialog.service';
import { DateUtil } from './services/date-util.service';
import { DurationService } from './services/duration.service';
import { InfoService } from './services/info.service';
import { CurrentSubjectsResolverService } from './services/resolver/current-subjects-resolver.service';
import { SchoolClassSubjectResolver } from './services/school-class-subject/school-class-subject-resolver.service';
import { SchoolClassSubjectService } from './services/school-class-subject/school-class-subject.service';
import { ResponsiveHelperService } from './services/ui/responsive-helper.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    DateUtil,
    DefaultAuthService,
    ConfirmDialogService,
    ColorService,
    InfoService,
    ResponsiveHelperService,
    NotificationWrapperService,
    DurationService,
    AuthGuard,
    UserService,
    JwtHelperService,
    BasilWrapperService,
    // Exam Services
    ExamService,
    ExamTaskService,
    ExamCreateUpdateComponent,
    SchoolClassSubjectResolver,
    ExamListResolver,
    ActiveExamListResolver,
    ExamResolver,
    // Manage Services
    ManageService,
    InstitutionService,
    SchoolClassService,
    SchoolYearService,
    SemesterService,
    SubjectService,
    ManageDialogFactory,
    // Mark Services
    MarkService,
    SemesterMarkResolver,
    SubjectMarkGroupResolver,
    MarkGroupResolver,
    MarkResolver,
    // Task Services
    TaskService,
    TaskResolver,
    TaskListResolver,

    CurrentSubjectsResolverService,
    SchoolClassSubjectService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthHttpInterceptor,
      deps: [DefaultAuthService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: UrlPrefixingHttpInterceptor
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: DateBodyAwareHttpInterceptor
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: ErrorCatchingHttpInterceptor,
      deps: [NotificationWrapperService]
    }
  ]
})
export class CoreModule {
}
