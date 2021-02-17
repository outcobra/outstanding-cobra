import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { OCMaterialModule } from '../oc-material.module';
import { OCUiModule } from '../oc-ui/oc-ui.module';
import { AuthComponent } from './auth.component';
import { GoogleLoginComponent } from './google-login/google-login.component';
import { LoginSignUpComponent } from './login/login-signup.component';

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
