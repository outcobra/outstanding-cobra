import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExamComponent} from './exam.component';
import {ExamRoutingModule} from './exam-routing.module';
import {OCUiModule} from '../oc-ui/oc-ui.module';
import {OCMaterialModule} from '../oc-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ExamListItemComponent} from './exam-list-item/exam-list-item.component';
import {ExamCreateUpdateComponent} from './exam-create-update/exam-create-update.component';
import {PipeModule} from '../shared/pipe.module';


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
