import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {OCMaterialModule} from '../oc-material.module';
import {LoginSignUpComponent} from './login/login-signup.component';
import {TranslateModule} from '@ngx-translate/core';
import {OCUiModule} from '../oc-ui/oc-ui.module';
import {AuthenticationCallbackComponent} from './authentication-callback/authentication-callback.component';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        OCMaterialModule,
        OCUiModule,
        RouterModule
    ],
    declarations: [
        LoginSignUpComponent,
        AuthComponent,
        AuthenticationCallbackComponent
    ]
})
export class AuthModule {
}
