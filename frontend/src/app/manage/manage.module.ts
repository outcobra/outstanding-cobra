import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OCMaterialModule } from '../oc-material.module';
import { PipeModule } from '../shared/pipe.module';
import { SharedModule } from '../shared/shared.module';
import { ManageRoutingModule } from './manage-routing.module';
import { ManageComponent } from './manage.component';

@NgModule({
  imports: [
    CommonModule,
    ManageRoutingModule,
    OCMaterialModule,
    FlexLayoutModule,
    SharedModule,
    PipeModule
  ],
  declarations: [
    ManageComponent
  ]
})
export class ManageModule {
}
