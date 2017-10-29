import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignupComponent} from './signup/signup.component';
import {AuthComponent} from './auth.component';
import {OCMaterialModule} from '../oc-material.module';
import {LoginComponent} from './login/login.component';
import {TranslateModule} from '@ngx-translate/core';
import {OCUiModule} from '../oc-ui/oc-ui.module';
import {AuthenticationCallbackComponent} from './authentication-callback/authentication-callback.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        OCMaterialModule,
        OCUiModule
    ],
    declarations: [
        LoginComponent,
        SignupComponent,
        AuthComponent,
        AuthenticationCallbackComponent
    ]
})
export class AuthModule {
}
