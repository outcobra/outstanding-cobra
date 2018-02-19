import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {OCMaterialModule} from '../oc-material.module';
import {LoginSignUpComponent} from './login/login-signup.component';
import {TranslateModule} from '@ngx-translate/core';
import {OCUiModule} from '../oc-ui/oc-ui.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {GoogleLoginComponent} from './google-login/google-login.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        OCMaterialModule,
        OCUiModule,
        RouterModule
    ],
    declarations: [
        LoginSignUpComponent,
        GoogleLoginComponent,
        AuthComponent
    ]
})
export class AuthModule {
}
