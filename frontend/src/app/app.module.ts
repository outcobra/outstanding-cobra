import {APP_INITIALIZER, ErrorHandler, Injector, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {translateFactory, translationLoader} from './core/services/factories';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CoreModule} from './core/core.module';
import {OCMaterialModule} from './oc-material.module';
import {RavenErrorHandler} from './core/error/raven-error-handler';
import {PipeModule} from './shared/pipe.module';
import {FallbackComponent} from './main/fallback/fallback.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ErrorStateMatcher } from '@angular/material/core';
import {OCErrorStateMatcher} from './core/services/oc-error-state-matcher';
import {LayoutModule} from './layout/layout.module';
import {AuthModule} from './auth/auth.module';
import {ManageDialogModule} from './manage/manage-dialog.module';
import {MainModule} from './main/main.module';

@NgModule({
    declarations: [
        AppComponent,
        FallbackComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        OCMaterialModule,
        CoreModule,
        SharedModule,
        LayoutModule,
        AuthModule,
        MainModule,
        ManageDialogModule,
        FlexLayoutModule,
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
            useClass: OCErrorStateMatcher
        }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
