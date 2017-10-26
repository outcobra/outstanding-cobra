import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignupComponent} from './signup/signup.component';
import {AuthComponent} from './auth.component';
import {OCMaterialModule} from '../oc-material.module';

@NgModule({
    imports: [
        CommonModule,
        OCMaterialModule
    ],
    declarations: [
        SignupComponent,
        AuthComponent
    ]
})
export class AuthModule {
}
