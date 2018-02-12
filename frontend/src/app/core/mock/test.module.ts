import {NgModule} from '@angular/core';
import {MockInfoService} from './info/mock-info.service';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {MockNotificationWrapperService} from './notifications/mock-notifications.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {MockTranslateLoader} from './i18n/MockTranslateLoader';
import {MockAuthService} from './auth/mock-auth.service';
import {MockResponsiveHelperService} from './ui/mock-responsive-helper.service';
import {MockManageService} from './manage/mock-manage.service';
import {ManageService} from '../../manage/service/manage.service';
import {InstitutionService} from '../../manage/service/institution.service';
import {MockInstitutionService} from './manage/manage-entities/mock-institution.servicce';
import {SchoolClassService} from '../../manage/service/school-class.service';
import {MockSchoolClassService} from './manage/manage-entities/mock-school-class.service';
import {SchoolYearService} from '../../manage/service/school-year.service';
import {MockSchoolYearService} from './manage/manage-entities/mock-school-year.service';
import {SemesterService} from '../../manage/service/semester.service';
import {MockSemesterService} from './manage/manage-entities/mock-semester.service';
import {SubjectService} from '../../manage/service/subject.service';
import {MockSubjectService} from './manage/manage-entities/mock-subject.service';
import {MockConfirmDialogService} from './ui/mock-confirm-dialog.service';
import {ManageDialogFactory} from '../../manage/service/manage-dialog-factory';
import {MockManageDialogFactory} from './manage/mock-manage-dialog.factory';
import {MockColorService} from './mock-color.service';
import {MockTaskService} from './task/mock-task.service';
import {TaskService} from '../../task/service/task.service';
import {InfoService} from '../services/info.service';
import {DefaultAuthService} from '../services/auth/auth.service';
import {ResponsiveHelperService} from '../services/ui/responsive-helper.service';
import {ConfirmDialogService} from '../services/confirm-dialog.service';
import {ColorService} from '../services/color.service';
import {OCMaterialModule} from '../../oc-material.module';
import {NotificationWrapperService} from 'app/core/notifications/notification-wrapper.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DurationService} from '../services/duration.service';
import {MockDurationService} from './datetime/mock-duration.service';
import {ObservableMedia} from '@angular/flex-layout';
import {MockObservableMedia} from './ui/mock-observable-media.service';
import {MarkService} from '../../mark/service/mark.service';
import {MockMarkService} from './mark/mock-mark.service';
import {PipeModule} from '../../shared/pipe.module';
import {MockExamService} from './exam/mock-exam.service';
import {ExamService} from '../../exam/service/exam.service';
import {ExamTaskService} from '../../exam/service/exam-task.service';
import {MockExamTaskService} from './exam/mock-exam-task.service';
import {UserService} from '../services/user.service';
import {MockUserService} from './auth/mock-user.service';
import {BasilWrapperService} from '../persistence/basil-wrapper.service';

@NgModule({
    imports: [
        CommonModule,
        NoopAnimationsModule,
        OCMaterialModule,
        TranslateModule.forRoot({
            loader: {provide: TranslateLoader, useClass: MockTranslateLoader}
        }),
        SimpleNotificationsModule.forRoot(),
        PipeModule
    ],
    exports: [
        CommonModule,
        NoopAnimationsModule,
        OCMaterialModule,
        TranslateModule,
        PipeModule
    ],
    providers: [
        {
            provide: InfoService,
            useClass: MockInfoService
        },
        {
            provide: NotificationWrapperService,
            useClass: MockNotificationWrapperService
        },
        {
            provide: DefaultAuthService,
            useClass: MockAuthService
        },
        {
            provide: UserService,
            useClass: MockUserService
        },
        {
            provide: ResponsiveHelperService,
            useClass: MockResponsiveHelperService
        },
        {
            provide: ManageService,
            useClass: MockManageService
        },
        {
            provide: InstitutionService,
            useClass: MockInstitutionService
        },
        {
            provide: SchoolClassService,
            useClass: MockSchoolClassService
        },
        {
            provide: SchoolYearService,
            useClass: MockSchoolYearService
        },
        {
            provide: SemesterService,
            useClass: MockSemesterService
        },
        {
            provide: SubjectService,
            useClass: MockSubjectService
        },
        {
            provide: ConfirmDialogService,
            useClass: MockConfirmDialogService
        },
        {
            provide: ManageDialogFactory,
            useClass: MockManageDialogFactory
        },
        {
            provide: ColorService,
            useClass: MockColorService
        },
        {
            provide: TaskService,
            useClass: MockTaskService
        },
        {
            provide: MarkService,
            useClass: MockMarkService
        },
        {
            provide: ExamService,
            useClass: MockExamService,
        },
        {
            provide: ExamTaskService,
            useClass: MockExamTaskService
        },
        {
            provide: DurationService,
            useClass: MockDurationService
        },
        {
            provide: ObservableMedia,
            useClass: MockObservableMedia
        },
        BasilWrapperService
    ]
})
export class TestModule {
}
