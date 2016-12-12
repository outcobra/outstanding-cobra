import {NgModule} from "@angular/core";
import {CommonModule, DatePipe} from "@angular/common";
import {ManageComponent} from "./manage.component";
import {ManageRoutingModule} from "./manage-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";
import {SharedModule} from "../shared/shared.module";
import {ManageService} from "./service/manage.service";
import {EntityMenuComponent} from "./entity-menu/entity-menu.component";
import {TranslateModule} from "ng2-translate";
import {InstitutionDialog} from "./institution-dialog/institution-dialog.component";
import {SchoolClassDialog} from "./school-class-dialog/school-class-dialog.component";
import {InstitutionService} from "./service/institution.service";
import {SchoolClassService} from "./service/school-class.service";
import {SchoolYearDialog} from './school-year-dialog/school-year-dialog.component';
import {SemesterDialog} from "./semester-dialog/semester-dialog.component";
import {SchoolYearService} from "./service/school-year.service";
import {SemesterService} from "./service/semester.service";
import {ManageDialogFactory} from "./service/manage-dialog-factory";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ManageRoutingModule,
        MaterialModule.forRoot(),
        SharedModule
    ],
    declarations: [
        ManageComponent,
        EntityMenuComponent,
        InstitutionDialog,
        SchoolClassDialog,
        SchoolYearDialog,
        SemesterDialog
    ],
    entryComponents: [
        InstitutionDialog,
        SchoolClassDialog,
        SchoolYearDialog,
        SemesterDialog
    ],
    providers: [
        ManageService,
        InstitutionService,
        SchoolClassService,
        SchoolYearService,
        SemesterService,
        ManageDialogFactory,
        {
            provide: DatePipe,
            useClass: DatePipe
        }
    ]
})
export class ManageModule {
}
