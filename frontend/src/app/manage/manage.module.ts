import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageComponent} from './manage.component';
import {ManageRoutingModule} from './manage-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {InstitutionDialog} from './institution-dialog/institution-dialog.component';
import {SchoolClassDialog} from './school-class-dialog/school-class-dialog.component';
import {SchoolYearDialog} from './school-year-dialog/school-year-dialog.component';
import {SemesterDialog} from './semester-dialog/semester-dialog.component';
import {SubjectDialog} from './subject-dialog/subject-dialog.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {OCMaterialModule} from '../oc-material.module';
import {PipeModule} from '../shared/pipe.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ManageRoutingModule,
        OCMaterialModule,
        FlexLayoutModule,
        SharedModule,
        PipeModule
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
    ]
})
export class ManageModule {
}
