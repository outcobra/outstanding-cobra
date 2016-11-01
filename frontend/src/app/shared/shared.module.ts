import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";

import {NotificationsService, SimpleNotificationsModule} from "angular2-notifications";
import {RequestOptions, XHRBackend, HttpModule} from "@angular/http";
import {HttpInterceptor} from "./http/HttpInterceptor";
import {TranslateModule, TranslateService} from "ng2-translate";
import {NotificationWrapperService} from "./notifications/notification-wrapper.service";
import { TimepickerComponent } from './components/timepicker/timepicker.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import {MaterialModule} from "@angular/material";
import {DaypickerComponent} from "./components/datepicker/daypicker.component";
import {YearpickerComponent} from "./components/datepicker/yearpicker.component";
import {DateUtil} from "./services/DateUtil";
import {FormsModule} from "@angular/forms";
import {AuthService} from "./services/auth/AuthService";
import {Config} from "../config/Config";

@NgModule({
    declarations: [
        TimepickerComponent,
        DatepickerComponent,
        DaypickerComponent,
        YearpickerComponent
    ],
    exports: [
        DatepickerComponent
    ],
    imports: [
        HttpModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        MaterialModule.forRoot(),
        SimpleNotificationsModule
    ],
    providers: [
        DateUtil,
        AuthService,
        HttpInterceptor,
        NotificationWrapperService,
        {
            provide: NotificationsService,
            useExisting: NotificationWrapperService
        }
    ],
})
export class SharedModule {
}
