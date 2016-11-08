import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageComponent} from "./manage.component";
import {ManageRoutingModule} from "./manage-routing.module";
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";
import {SharedModule} from "../shared/shared.module";
import {ManageService} from "./manage.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ManageRoutingModule,
        MaterialModule.forRoot(),
        SharedModule
    ],
    declarations: [
        ManageComponent
    ],
    providers: [
        ManageService
    ]
})
export class ManageModule {
}
