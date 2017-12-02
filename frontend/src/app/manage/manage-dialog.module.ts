import {NgModule} from '@angular/core';
import {InstitutionDialog} from './institution-dialog/institution-dialog.component';
import {SchoolClassDialog} from './school-class-dialog/school-class-dialog.component';
import {SchoolYearDialog} from './school-year-dialog/school-year-dialog.component';
import {SemesterDialog} from './semester-dialog/semester-dialog.component';
import {SubjectDialog} from './subject-dialog/subject-dialog.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PipeModule} from '../shared/pipe.module';
import {CommonModule} from '@angular/common';
import {OCMaterialModule} from '../oc-material.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        OCMaterialModule,
        FlexLayoutModule,
        SharedModule,
        PipeModule
    ],
    declarations: [
        InstitutionDialog,
        SchoolClassDialog,
        SchoolYearDialog,
        SemesterDialog,
        SubjectDialog
    ],
    exports: [
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
export class ManageDialogModule {
}
