import {NgModule} from '@angular/core';
import {MockHttpInterceptor} from './http/MockHttpInterceptor';
import {Config} from '../../config/Config';
import {MockConfig} from './config/MockConfig';
import {MockInfoService} from './info/mock-info.service';
import {SimpleNotificationsModule} from 'angular2-notifications/dist';
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
import {HttpInterceptor} from '../http/HttpInterceptor';
import {InfoService} from '../services/info.service';
import {Auth0AuthService} from '../services/auth/auth.service';
import {ResponsiveHelperService} from '../services/ui/responsive-helper.service';
import {ConfirmDialogService} from '../services/confirm-dialog.service';
import {ColorService} from '../services/color.service';
import {OCMaterialModule} from '../../oc-material.module';
import {NotificationWrapperService} from 'app/core/notifications/notification-wrapper.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MockBackend} from '@angular/http/testing';
import {ConnectionBackend, HttpModule} from '@angular/http';
import {DurationService} from '../services/duration.service';
import {MockDurationService} from './datetime/mock-duration.service';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        NoopAnimationsModule,
        OCMaterialModule,
        TranslateModule.forRoot({
            loader: {provide: TranslateLoader, useClass: MockTranslateLoader}
        }),
        SimpleNotificationsModule.forRoot()
    ],
    exports: [
        CommonModule,
        HttpModule,
        NoopAnimationsModule,
        OCMaterialModule,
        TranslateModule,
        SimpleNotificationsModule
    ],
    providers: [
        {
            provide: ConnectionBackend,
            useClass: MockBackend
        },
        {
            provide: HttpInterceptor,
            useClass: MockHttpInterceptor
        },
        {
            provide: Config,
            useClass: MockConfig
        },
        {
            provide: InfoService,
            useClass: MockInfoService
        },
        {
            provide: NotificationWrapperService,
            useClass: MockNotificationWrapperService
        },
        {
            provide: Auth0AuthService,
            useClass: MockAuthService
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
            provide: DurationService,
            useClass: MockDurationService
        }
    ]
})
export class TestModule {
}
