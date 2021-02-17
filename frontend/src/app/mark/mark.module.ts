import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { OCMaterialModule } from '../oc-material.module';
import { OCUiModule } from '../oc-ui/oc-ui.module';
import { PipeModule } from '../shared/pipe.module';
import { MarkCreateUpdateComponent } from './mark-create-update/mark-create-update.component';
import { MarkGroupCreateUpdateComponent } from './mark-group-create-update/mark-group-create-update.component';
import { MarkHighlighterDirective } from './mark-highlighter/mark-highlighter.directive';
import { MarkRoutingModule } from './mark-routing.module';
import { MarkSemesterComponent } from './mark-semester/mark-semester.component';
import { MarkValueComponent } from './mark-value/mark-value.component';
import { MarkWeightUpdaterComponent } from './mark-weight-updater/mark-weight-updater.component';
import { MarkComponent } from './mark.component';

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
