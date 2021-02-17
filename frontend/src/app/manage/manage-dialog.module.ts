import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OCMaterialModule } from '../oc-material.module';
import { PipeModule } from '../shared/pipe.module';
import { SharedModule } from '../shared/shared.module';
import { InstitutionDialog } from './institution-dialog/institution-dialog.component';
import { SchoolClassDialog } from './school-class-dialog/school-class-dialog.component';
import { SchoolYearDialog } from './school-year-dialog/school-year-dialog.component';
import { SemesterDialog } from './semester-dialog/semester-dialog.component';
import { SubjectDialog } from './subject-dialog/subject-dialog.component';

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
  ]
})
export class ManageDialogModule {
}
