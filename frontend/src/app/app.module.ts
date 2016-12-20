import {NgModule, APP_INITIALIZER} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule, Http} from "@angular/http";
import {MaterialModule} from "@angular/material";
import {TranslateModule, TranslateLoader, TranslateStaticLoader, TranslateService} from "ng2-translate";
import "rxjs/add/operator/toPromise";
import {AppComponent} from "./app.component";
import {Config} from "./config/Config";
import {SharedModule} from "./shared/shared.module";
import {SimpleNotificationsModule} from "angular2-notifications";
import {AppRoutingModule} from "./app-routing.module";
import {MainModule} from "./main/main.module";
import {ManageModule} from "./manage/manage.module";
import {TaskModule} from "./task/task.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        SharedModule,
        MainModule,
        ManageModule,
        TaskModule,
        MaterialModule.forRoot(),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
            deps: [Http]
        }),
        SimpleNotificationsModule
    ],
    providers: [
        Config,
        {
            provide: APP_INITIALIZER,
            useFactory: (config: Config, translateService: TranslateService) => () => config.load(),
            deps: [Config],
            multi: true
        },
        {
            provide: APP_INITIALIZER,
            useFactory: (translateService: TranslateService) => () => {
                translateService.setDefaultLang('en');
                return translateService.use(translateService.getBrowserLang()).toPromise();
            },
            deps: [TranslateService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
