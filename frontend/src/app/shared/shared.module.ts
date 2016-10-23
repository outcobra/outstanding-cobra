import {NgModule} from '@angular/core';
import {NotificationsService, SimpleNotificationsModule} from "angular2-notifications";
import {RequestOptions, XHRBackend, HttpModule} from "@angular/http";
import {HttpInterceptor} from "./http/HttpInterceptor";
import {TranslateService} from "ng2-translate";
import {NotificationWrapperService} from "./notifications/notification-wrapper.service";

@NgModule({
    declarations: [],
    exports: [],
    imports: [
        HttpModule,
        SimpleNotificationsModule
    ],
    providers: [
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
export class SharedModule{}
