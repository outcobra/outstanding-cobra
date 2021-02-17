import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { OCMaterialModule } from '../oc-material.module';
import { OCUiModule } from '../oc-ui/oc-ui.module';
import { PipeModule } from '../shared/pipe.module';
import { SharedModule } from '../shared/shared.module';
import { ExamCreateUpdateComponent } from './exam-create-update/exam-create-update.component';
import { ExamListItemComponent } from './exam-list-item/exam-list-item.component';
import { ExamRoutingModule } from './exam-routing.module';
import { ExamComponent } from './exam.component';


@NgModule({
  declarations: [
    ExamComponent,
    ExamListItemComponent,
    ExamCreateUpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OCMaterialModule,
    FlexLayoutModule,
    TranslateModule,
    ExamRoutingModule,
    SharedModule,
    OCUiModule,
    PipeModule
  ]
})
export class ExamModule {
}
