import {NgModule} from '@angular/core';
import {NotificationsService} from "angular2-notifications";
import {RequestOptions, XHRBackend} from "@angular/http";
import {HttpInterceptor} from "./http/HttpInterceptor";

@NgModule({
    declarations: [],
    exports: [],
    imports: [],
    providers: [
        {
            provide: HttpInterceptor,
            useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, notificationsService: NotificationsService) => new HttpInterceptor(backend, defaultOptions, notificationsService),
            deps: [XHRBackend, RequestOptions, NotificationsService]
        }
    ],
})
export class SharedModule{}
