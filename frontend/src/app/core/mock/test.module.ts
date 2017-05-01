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
        }
    ]
})
export class TestModule {

}
