import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageComponent} from "./manage.component";
import {ManageRoutingModule} from "./manage-routing.module";
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";
import {SharedModule} from "../shared/shared.module";
import {ManageService} from "./manage.service";
import { EntityMenuComponent } from './entity-menu/entity-menu.component';
import {TranslateModule} from "ng2-translate";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ManageRoutingModule,
        MaterialModule.forRoot(),
        TranslateModule,
        SharedModule
    ],
    declarations: [
        ManageComponent,
        EntityMenuComponent
    ],
    providers: [
        ManageService
    ]
})
export class ManageModule {
}
