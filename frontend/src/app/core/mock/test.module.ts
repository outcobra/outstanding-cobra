import {NgModule} from '@angular/core';
import {MockHttpInterceptor} from './http/MockHttpInterceptor';
import {HttpInterceptor} from '../../shared/http/HttpInterceptor';
import {Config} from '../../config/Config';
import {MockConfig} from './config/MockConfig';
import {MockInfoService} from './info/mock-info.service';
import {InfoService} from '../../shared/services/info.service';
import {NotificationsService, SimpleNotificationsModule} from 'angular2-notifications/dist';
import {MockNotificationsService} from './notifications/mock-notifications.service';
import {MaterialModule} from '@angular/material';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {MockTranslateLoader} from './i18n/MockTranslateLoader';
import {Auth0AuthService} from '../../shared/services/auth/auth.service';
import {MockAuthService} from './auth/mock-auth.service';
import {ResponsiveHelperService} from 'app/shared/services/ui/responsive-helper.service';
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
import {ConfirmDialogService} from '../../shared/services/confirm-dialog.service';
import {ManageDialogFactory} from '../../manage/service/manage-dialog-factory';
import {MockManageDialogFactory} from './manage/mock-manage-dialog.factory';

@NgModule({
    imports: [
        CommonModule,
        SimpleNotificationsModule,
        MaterialModule,
        TranslateModule.forRoot({
            loader: {provide: TranslateLoader, useClass: MockTranslateLoader}
        })
    ],
    exports: [
        CommonModule,
        SimpleNotificationsModule,
        MaterialModule,
        TranslateModule
    ],
    providers: [
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
            provide: NotificationsService,
            useClass: MockNotificationsService
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
        }
    ]
})
export class TestModule {

}
