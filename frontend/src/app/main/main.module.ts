import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MainRoutingModule} from "./main-routing.module";
import {SharedModule} from "../shared/shared.module";
import {MaterialModule} from "@angular/material";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MainRoutingModule,
        MaterialModule.forRoot(),
        SharedModule
    ],
    declarations: [
        MainComponent,
        DashboardComponent
    ],
    providers: [

    ]
})
export class MainModule {
}
