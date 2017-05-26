import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarkComponent} from './mark.component';
import {MarkSemesterComponent} from './mark-semester/mark-semester.component';
import {MarkRoutingModule} from './mark-routing.module';
import {CoreModule} from '../core/core.module';
import {OCMaterialModule} from '../oc-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {OCUiModule} from '../oc-ui/oc-ui.module';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule,
        MarkRoutingModule,
        CoreModule,
        OCMaterialModule,
        OCUiModule,
        FlexLayoutModule
    ],
    declarations: [
        MarkComponent,
        MarkSemesterComponent
    ]
})
export class MarkModule {
}
