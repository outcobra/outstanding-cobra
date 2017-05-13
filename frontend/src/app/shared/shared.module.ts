import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationsService, SimpleNotificationsModule} from 'angular2-notifications';
import {HttpModule} from '@angular/http';
import {HttpInterceptor} from '../core/http/HttpInterceptor';
import {TranslateModule} from '@ngx-translate/core';
import {NotificationWrapperService} from '../core/notifications/notification-wrapper.service';
import {TimepickerComponent} from './components/timepicker/timepicker.component';
import {DatepickerComponent} from './components/datepicker/datepicker.component';
import {MaterialModule} from '@angular/material';
import {DaypickerComponent} from './components/datepicker/daypicker.component';
import {YearpickerComponent} from './components/datepicker/yearpicker.component';
import {DateUtil} from '../core/services/date-util.service';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../core/services/auth/auth.service';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {ConfirmDialogService} from '../core/services/confirm-dialog.service';
import {ColorService} from '../core/services/color.service';
import {ColorpickerComponent} from './components/colorpicker/colorpicker.component';
import {ResponsiveHelperService} from '../core/services/ui/responsive-helper.service';
import {InfoService} from '../core/services/info.service';
import {InfoDialogComponent} from './components/info-dialog/info-dialog.component';
import {OCUiModule} from '../oc-ui/oc-ui.module';
import {DatePickerErrorDirective} from './components/datepicker/datepicker-error.directive';

@NgModule({
    declarations: [
        TimepickerComponent,
        DatepickerComponent,
        DaypickerComponent,
        DatePickerErrorDirective,
        YearpickerComponent,
        ColorpickerComponent,
        ConfirmDialogComponent,
        InfoDialogComponent
    ],
    exports: [
        DatepickerComponent,
        DatePickerErrorDirective,
        ColorpickerComponent,
        ConfirmDialogComponent,
        OCUiModule,
        TranslateModule,
        InfoDialogComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        MaterialModule,
        OCUiModule
    ],
    entryComponents: [
        ConfirmDialogComponent,
        InfoDialogComponent
    ]
})
export class SharedModule {
}
