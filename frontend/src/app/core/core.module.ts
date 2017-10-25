import {NgModule} from '@angular/core';
import {HttpInterceptor} from './http/http-interceptor';
import {ResponsiveHelperService} from './services/ui/responsive-helper.service';
import {InfoService} from './services/info.service';
import {ColorService} from './services/color.service';
import {ConfirmDialogService} from './services/confirm-dialog.service';
import {Auth0AuthService} from './services/auth/auth.service';
import {DateUtil} from './services/date-util.service';
import {NotificationWrapperService} from './notifications/notification-wrapper.service';
import {DurationService} from './services/duration.service';
import {SchoolClassSubjectService} from './services/school-class-subject/school-class-subject.service';

@NgModule({
    providers: [
        HttpInterceptor,
        DateUtil,
        Auth0AuthService,
        ConfirmDialogService,
        ColorService,
        InfoService,
        ResponsiveHelperService,
        NotificationWrapperService,
        DurationService,
        SchoolClassSubjectService
    ]
})
export class CoreModule {
}
