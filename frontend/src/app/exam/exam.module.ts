import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExamComponent} from './exam.component';
import {ExamRoutingModule} from './exam-routing.module';
import {OCUiModule} from '../oc-ui/oc-ui.module';
import {CoreModule} from '../core/core.module';
import {OCMaterialModule} from '../oc-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {ExamService} from './service/exam.service';
import {SharedModule} from '../shared/shared.module';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MdCheckboxModule, MdCoreModule, MdInputModule} from '@angular/material';
import {ExamListItemComponent} from './exam-list-item/exam-list-item.component';
import {ExamCreateUpdateDialogComponent} from './create-update-dialog/exam-create-update-dialog.component';
import {ExamTaskService} from './service/exam-task.service';
import {ResponsiveHelperService} from '../core/services/ui/responsive-helper.service';


@NgModule({
    declarations: [
        ExamComponent,
        ExamListItemComponent,
        ExamCreateUpdateDialogComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MdInputModule,
        MdCoreModule,
        MdCheckboxModule,
        CoreModule,
        OCMaterialModule,
        FlexLayoutModule,
        TranslateModule,
        ExamRoutingModule,
        SharedModule,
        OCUiModule,
        ResponsiveHelperService,
        FormBuilder
    ],
    providers: [
        ExamService,
        ExamTaskService
    ]
})
export class ExamModule {
}
