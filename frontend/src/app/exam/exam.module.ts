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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ExamListItemComponent} from './exam-list-item/exam-list-item.component';
import {ExamCreateUpdateDialog} from './exam-create-update-dialog/exam-create-update-dialog.component';
import {ExamTaskService} from './service/exam-task.service';
import {PipeModule} from '../shared/pipe.module';
import {SubjectFilterResolver} from '../core/services/school-class-subject/school-class-subject-resolver.service';
import {ExamListResolver} from './service/exam.list.resolver.service';
import {ActiveExamListResolver} from './service/active.exam.list.resolver.service';


@NgModule({
    declarations: [
        ExamComponent,
        ExamListItemComponent,
        ExamCreateUpdateDialog
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        OCMaterialModule,
        FlexLayoutModule,
        TranslateModule,
        ExamRoutingModule,
        SharedModule,
        OCUiModule,
        PipeModule
    ],
    providers: [
        ExamService,
        ExamTaskService,
        ExamCreateUpdateDialog,
        SubjectFilterResolver,
        ExamListResolver,
        ActiveExamListResolver
    ],
    entryComponents: [
        ExamCreateUpdateDialog
    ]
})
export class ExamModule {
}
