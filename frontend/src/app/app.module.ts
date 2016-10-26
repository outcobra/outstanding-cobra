import {NgModule, APP_INITIALIZER} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule, Http} from '@angular/http';
import {MaterialModule} from "@angular/material";
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate';

import {AppComponent} from './app.component';
import {Config} from "./config/Config";
import {SharedModule} from "./shared/shared.module";
import {SimpleNotificationsModule} from "angular2-notifications";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        SharedModule,
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
            useFactory: (config: Config) => () => config.load(),
            deps: [Config],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
