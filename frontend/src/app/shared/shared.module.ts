import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NotificationsService, SimpleNotificationsModule} from "angular2-notifications";
import {HttpModule} from "@angular/http";
import {HttpInterceptor} from "./http/HttpInterceptor";
import {TranslateModule} from "ng2-translate";
import {NotificationWrapperService} from "./notifications/notification-wrapper.service";
import {TimepickerComponent} from "./components/timepicker/timepicker.component";
import {DatepickerComponent} from "./components/datepicker/datepicker.component";
import {MaterialModule} from "@angular/material";
import {DaypickerComponent} from "./components/datepicker/daypicker.component";
import {YearpickerComponent} from "./components/datepicker/yearpicker.component";
import {DateUtil} from "./services/date-util.service";
import {FormsModule} from "@angular/forms";
import {AuthService} from "./services/auth/auth.service";
import {SidenavComponent, SidenavLayout} from "./components/sidenav/sidenav";
import {
    CollapsibleComponent,
    CollapsibleBodyComponent,
    CollapsibleHeaderComponent
} from "./components/collapsible/collapsible";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {ConfirmDialogService} from "./services/confirm-dialog.service";

@NgModule({
    declarations: [
        TimepickerComponent,
        DatepickerComponent,
        DaypickerComponent,
        YearpickerComponent,
        SidenavComponent,
        SidenavLayout,
        CollapsibleComponent,
        CollapsibleHeaderComponent,
        CollapsibleBodyComponent,
        ConfirmDialogComponent
    ],
    exports: [
        DatepickerComponent,
        SidenavComponent,
        SidenavLayout,
        CollapsibleComponent,
        CollapsibleHeaderComponent,
        CollapsibleBodyComponent
    ],
    imports: [
        HttpModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        MaterialModule.forRoot(),
        SimpleNotificationsModule
    ],
    entryComponents: [
        ConfirmDialogComponent
    ],
    providers: [
        DateUtil,
        AuthService,
        HttpInterceptor,
        ConfirmDialogService,
        NotificationWrapperService,
        {
            provide: NotificationsService,
            useExisting: NotificationWrapperService
        }
    ],
})
export class SharedModule {
}
