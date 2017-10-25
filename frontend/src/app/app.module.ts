import {APP_INITIALIZER, ErrorHandler, Injector, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {AppComponent} from './app.component';
import {ConfigService} from './core/config/config.service';
import {SharedModule} from './shared/shared.module';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {AppRoutingModule} from './app-routing.module';
import {configLoader, translateFactory, translationLoader} from './core/services/factories';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CoreModule} from './core/core.module';
import {OCMaterialModule} from './oc-material.module';
import {RavenErrorHandler} from './core/error/raven-error-handler';
import {PipeModule} from './shared/pipe.module';
import {FallbackComponent} from './main/fallback/fallback.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ErrorStateMatcher} from '@angular/material';
import {OcErrorStateMatcher} from './core/services/oc-error-state-matcher';
import {LayoutModule} from './layout/layout.module';

@NgModule({
    declarations: [
        AppComponent,
        FallbackComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        SimpleNotificationsModule.forRoot(),
        OCMaterialModule,
        SharedModule,
        LayoutModule,
        FlexLayoutModule,
        CoreModule,
        PipeModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: translateFactory,
                deps: [HttpClient]
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
        },
        {
            provide: ErrorStateMatcher,
            useClass: OcErrorStateMatcher
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
