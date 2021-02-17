import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, Injector, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { RavenErrorHandler } from './core/error/raven-error-handler';
import { translateFactory, translationLoader } from './core/services/factories';
import { OCErrorStateMatcher } from './core/services/oc-error-state-matcher';
import { LayoutModule } from './layout/layout.module';
import { FallbackComponent } from './main/fallback/fallback.component';
import { MainModule } from './main/main.module';
import { ManageDialogModule } from './manage/manage-dialog.module';
import { OCMaterialModule } from './oc-material.module';
import { PipeModule } from './shared/pipe.module';
import { SharedModule } from './shared/shared.module';

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
export class AppModule {
}
