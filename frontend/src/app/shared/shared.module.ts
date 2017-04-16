import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationsService, SimpleNotificationsModule} from 'angular2-notifications';
import {HttpModule} from '@angular/http';
import {HttpInterceptor} from './http/HttpInterceptor';
import {TranslateModule} from '@ngx-translate/core';
import {NotificationWrapperService} from './notifications/notification-wrapper.service';
import {TimepickerComponent} from './components/timepicker/timepicker.component';
import {DatepickerComponent} from './components/datepicker/datepicker.component';
import {MaterialModule} from '@angular/material';
import {DaypickerComponent} from './components/datepicker/daypicker.component';
import {YearpickerComponent} from './components/datepicker/yearpicker.component';
import {DateUtil} from './services/date-util.service';
import {FormsModule} from '@angular/forms';
import {AuthService} from './services/auth/auth.service';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {ConfirmDialogService} from './services/confirm-dialog.service';
import {ColorService} from './services/color.service';
import {ColorpickerComponent} from './components/colorpicker/colorpicker.component';
import {ResponsiveHelperService} from './services/ui/responsive-helper.service';
import {InfoService} from './services/info.service';
import {InfoDialogComponent} from './components/info-dialog/info-dialog.component';
import {OCUiModule} from '../oc-ui/oc-ui.module';

@NgModule({
    declarations: [
        TimepickerComponent,
        DatepickerComponent,
        DaypickerComponent,
        YearpickerComponent,
        ColorpickerComponent,
        ConfirmDialogComponent,
        InfoDialogComponent
    ],
    exports: [
        DatepickerComponent,
        ColorpickerComponent,
        ConfirmDialogComponent,
        OCUiModule,
        TranslateModule,
        InfoDialogComponent
    ],
    imports: [
        HttpModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        MaterialModule,
        OCUiModule,
        SimpleNotificationsModule
    ],
    entryComponents: [
        ConfirmDialogComponent,
        InfoDialogComponent
    ],
    providers: [
        DateUtil,
        AuthService,
        HttpInterceptor,
        ConfirmDialogService,
        ColorService,
        InfoService,
        ResponsiveHelperService,
        NotificationWrapperService,
        {
            provide: NotificationsService,
            useExisting: NotificationWrapperService
        }
    ],
})
export class SharedModule {
}
