import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignupComponent} from './signup/signup.component';
import {AuthComponent} from './auth.component';
import {OCMaterialModule} from '../oc-material.module';
import {LoginComponent} from './login/login.component';

@NgModule({
    imports: [
        CommonModule,
        OCMaterialModule
    ],
    declarations: [
        LoginComponent,
        SignupComponent,
        AuthComponent
    ]
})
export class AuthModule {
}
