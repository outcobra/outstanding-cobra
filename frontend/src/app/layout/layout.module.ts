import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { OCMaterialModule } from '../oc-material.module';
import { OCUiModule } from '../oc-ui/oc-ui.module';
import { AppLayoutComponent } from './app-layout/app-layout.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    OCMaterialModule,
    OCUiModule,
    TranslateModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    AppLayoutComponent
  ],
  exports: [
    AppLayoutComponent
  ]
})
export class LayoutModule {
}
