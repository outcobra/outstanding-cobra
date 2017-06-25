import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExamComponent} from './exam.component';
import {ExamRoutingModule} from './exam-routing.module';
import {OCUiModule} from '../oc-ui/oc-ui.module';
import {CoreModule} from '../core/core.module';
import {OCMaterialModule} from '../oc-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    declarations: [
        ExamComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        OCMaterialModule,
        FlexLayoutModule,
        TranslateModule,
        ExamRoutingModule,
        OCUiModule
    ]
})
export class ExamModule {
}
