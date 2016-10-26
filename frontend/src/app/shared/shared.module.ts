import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";

import {NotificationsService, SimpleNotificationsModule} from "angular2-notifications";
import {RequestOptions, XHRBackend, HttpModule} from "@angular/http";
import {HttpInterceptor} from "./http/HttpInterceptor";
import {TranslateService} from "ng2-translate";
import {NotificationWrapperService} from "./notifications/notification-wrapper.service";
import { TimepickerComponent } from './components/timepicker/timepicker.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import {MaterialModule} from "@angular/material";
import {DaypickerComponent} from "./components/datepicker/daypicker.component";
import {YearpickerComponent} from "./components/datepicker/yearpicker.component";
import {DateUtil} from "./services/DateUtil";

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
        MaterialModule.forRoot(),
        SimpleNotificationsModule
    ],
    providers: [
        DateUtil,
        {
            provide: HttpInterceptor,
            useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, notificationsService: NotificationsService) => new HttpInterceptor(backend, defaultOptions, notificationsService),
            deps: [XHRBackend, RequestOptions, NotificationsService]
        },
        {
            provide: NotificationsService,
            useFactory: (translateService: TranslateService) => new NotificationWrapperService(translateService),
            deps: [TranslateService]
        }
    ],
})
export class SharedModule {
}
