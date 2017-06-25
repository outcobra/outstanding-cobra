import {APP_INITIALIZER, ErrorHandler, Injector, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {Http, HttpModule} from '@angular/http';
import {MdNativeDateModule} from '@angular/material';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import 'rxjs/add/operator/toPromise';
import {AppComponent} from './app.component';
import {ConfigService} from './core/config/config.service';
import {SharedModule} from './shared/shared.module';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {AppRoutingModule} from './app-routing.module';
import {MainModule} from './main/main.module';
import {ManageModule} from './manage/manage.module';
import {TaskModule} from './task/task.module';
import {configLoader, translateFactory, translationLoader} from './core/services/factories';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CoreModule} from './core/core.module';
import {OCMaterialModule} from './oc-material.module';
import {RavenErrorHandler} from './core/error/raven-error-handler';
import {MarkModule} from './mark/mark.module';
import {ExamModule} from './exam/exam.module';

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
        MarkModule,
        ExamModule,
        FlexLayoutModule,
        SimpleNotificationsModule.forRoot(),
        CoreModule,
        OCMaterialModule,
        MdNativeDateModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: translateFactory,
                deps: [Http]
            }
        })
    ],
    providers: [
        ConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: configLoader,
            deps: [ConfigService, Injector],
            multi: true
        },
        {
            provide: APP_INITIALIZER,
            useFactory: translationLoader,
            deps: [TranslateService, Injector],
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
