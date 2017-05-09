import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {Http, HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import 'rxjs/add/operator/toPromise';
import {AppComponent} from './app.component';
import {Config} from './config/Config';
import {SharedModule} from './shared/shared.module';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {AppRoutingModule} from './app-routing.module';
import {MainModule} from './main/main.module';
import {ManageModule} from './manage/manage.module';
import {TaskModule} from './task/task.module';
import {configLoader, translateFactory, translationLoader} from './shared/services/factories';
import {RavenErrorHandler} from './shared/error/RavenErrorHandler';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        SharedModule,
        MainModule,
        ManageModule,
        TaskModule,
        MaterialModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: translateFactory,
                deps: [Http]
            }
        }),
        SimpleNotificationsModule
    ],
    providers: [
        Config,
        {
            provide: APP_INITIALIZER,
            useFactory: configLoader,
            deps: [Config],
            multi: true
        },
        {
            provide: APP_INITIALIZER,
            useFactory: translationLoader,
            deps: [TranslateService],
            multi: true
        },
        {
            provide: ErrorHandler,
            useClass: RavenErrorHandler
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
