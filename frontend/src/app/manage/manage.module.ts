import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ManageComponent} from './manage.component';
import {ManageRoutingModule} from './manage-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {ManageService} from './service/manage.service';
import {InstitutionDialog} from './institution-dialog/institution-dialog.component';
import {SchoolClassDialog} from './school-class-dialog/school-class-dialog.component';
import {InstitutionService} from './service/institution.service';
import {SchoolClassService} from './service/school-class.service';
import {SchoolYearDialog} from './school-year-dialog/school-year-dialog.component';
import {SemesterDialog} from './semester-dialog/semester-dialog.component';
import {SchoolYearService} from './service/school-year.service';
import {SemesterService} from './service/semester.service';
import {ManageDialogFactory} from './service/manage-dialog-factory';
import {SubjectDialog} from './subject-dialog/subject-dialog.component';
import {SubjectService} from './service/subject.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {OCMaterialModule} from '../oc-material.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ManageRoutingModule,
        OCMaterialModule,
        FlexLayoutModule,
        SharedModule
    ],
    declarations: [
        ManageComponent,
        InstitutionDialog,
        SchoolClassDialog,
        SchoolYearDialog,
        SemesterDialog,
        SubjectDialog
    ],
    entryComponents: [
        InstitutionDialog,
        SchoolClassDialog,
        SchoolYearDialog,
        SemesterDialog,
        SubjectDialog
    ],
    providers: [
        ManageService,
        InstitutionService,
        SchoolClassService,
        SchoolYearService,
        SemesterService,
        SubjectService,
        ManageDialogFactory,
        {
            provide: DatePipe,
            useClass: DatePipe
        }
    ]
})
export class ManageModule {
}
