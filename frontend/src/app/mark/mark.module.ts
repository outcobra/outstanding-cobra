import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarkComponent} from './mark.component';
import {MarkSemesterComponent} from './mark-semester/mark-semester.component';
import {MarkRoutingModule} from './mark-routing.module';
import {OCMaterialModule} from '../oc-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {OCUiModule} from '../oc-ui/oc-ui.module';
import {MarkValueComponent} from './mark-value/mark-value.component';
import {MarkCreateUpdateComponent} from './mark-create-update/mark-create-update.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PipeModule} from '../shared/pipe.module';
import {MarkGroupCreateUpdateComponent} from './mark-group-create-update/mark-group-create-update.component';
import {MarkWeightUpdaterComponent} from './mark-weight-updater/mark-weight-updater.component';
import {MarkHighlighterDirective} from './mark-highlighter/mark-highlighter.directive';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule,
        ReactiveFormsModule,
        MarkRoutingModule,
        OCMaterialModule,
        OCUiModule,
        FlexLayoutModule,
        PipeModule
    ],
    declarations: [
        MarkComponent,
        MarkSemesterComponent,
        MarkValueComponent,
        MarkCreateUpdateComponent,
        MarkGroupCreateUpdateComponent,
        MarkWeightUpdaterComponent,
        MarkHighlighterDirective
    ]
})
export class MarkModule {
}
