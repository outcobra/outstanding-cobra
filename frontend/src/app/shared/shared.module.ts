import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationsService, SimpleNotificationsModule} from 'angular2-notifications';
import {HttpModule} from '@angular/http';
import {HttpInterceptor} from './http/HttpInterceptor';
import {TranslateModule} from 'ng2-translate';
import {NotificationWrapperService} from './notifications/notification-wrapper.service';
import {TimepickerComponent} from './components/timepicker/timepicker.component';
import {DatepickerComponent} from './components/datepicker/datepicker.component';
import {MaterialModule} from '@angular/material';
import {DaypickerComponent} from './components/datepicker/daypicker.component';
import {YearpickerComponent} from './components/datepicker/yearpicker.component';
import {DateUtil} from './services/date-util.service';
import {FormsModule} from '@angular/forms';
import {AuthService} from './services/auth/auth.service';
import {SidenavComponent, SidenavLayout} from './components/sidenav/sidenav';
import {
    CollapsibleBodyComponent,
    CollapsibleComponent,
    CollapsibleHeaderComponent
} from './components/collapsible/collapsible';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {ConfirmDialogService} from './services/confirm-dialog.service';
import {ColorService} from './services/color.service';
import {ColorpickerComponent} from './components/colorpicker/colorpicker.component';
import {ResponsiveHelperService} from './services/ui/responsive-helper.service';
import {InfoService} from './services/info.service';
import {FooterComponent} from './components/footer/footer.component';
import {InfoDialogComponent} from './components/info-dialog/info-dialog.component';
import {IconDataComponent} from './components/icon-data/icon-data/icon-data.component';
import {IconDataChildComponent} from './components/icon-data/icon-data-child/icon-data-child.component';
import {IconDataDataDirective, IconDataTitleDirective} from './components/icon-data/icon-data-directives';

@NgModule({
    declarations: [
        TimepickerComponent,
        DatepickerComponent,
        DaypickerComponent,
        YearpickerComponent,
        ColorpickerComponent,
        SidenavComponent,
        SidenavLayout,
        CollapsibleComponent,
        CollapsibleHeaderComponent,
        CollapsibleBodyComponent,
        ConfirmDialogComponent,
        FooterComponent,
        InfoDialogComponent,
        IconDataComponent,
        IconDataChildComponent,
        IconDataTitleDirective,
        IconDataDataDirective
    ],
    exports: [
        DatepickerComponent,
        ColorpickerComponent,
        SidenavComponent,
        SidenavLayout,
        CollapsibleComponent,
        CollapsibleHeaderComponent,
        CollapsibleBodyComponent,
        FooterComponent,
        IconDataComponent,
        IconDataChildComponent,
        IconDataTitleDirective,
        IconDataDataDirective,
        TranslateModule
    ],
    imports: [
        HttpModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        MaterialModule,
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
