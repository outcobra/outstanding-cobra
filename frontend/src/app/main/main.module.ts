import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { OCMaterialModule } from '../oc-material.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    OCMaterialModule,
    FlexLayoutModule,
    SharedModule
  ],
  declarations: [
    MainComponent,
    DashboardComponent
  ]
})
export class MainModule {
}
