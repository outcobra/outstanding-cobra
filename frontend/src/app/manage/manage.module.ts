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
import { InstitutionDialog } from './institution-dialog/institution-dialog.component';
import { SchoolClassDialog } from './school-class-dialog/school-class-dialog.component';

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
        EntityMenuComponent,
        InstitutionDialog,
        SchoolClassDialog
    ],
    entryComponents: [
        InstitutionDialog,
        SchoolClassDialog
    ],
    providers: [
        ManageService
    ]
})
export class ManageModule {
}
