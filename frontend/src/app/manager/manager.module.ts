import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ManagerComponent} from "./manager.component";
import {ManagerRoutingModule} from "./manager-routing.module";
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      ManagerRoutingModule,
      MaterialModule.forRoot(),
      SharedModule
  ],
  declarations: [
      ManagerComponent
  ]
})
export class ManagerModule { }
