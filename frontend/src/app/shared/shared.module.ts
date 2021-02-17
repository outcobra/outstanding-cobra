import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { OCMaterialModule } from '../oc-material.module';
import { OCUiModule } from '../oc-ui/oc-ui.module';
import { ColorpickerComponent } from './components/colorpicker/colorpicker.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { I18nMarkdownComponent } from './components/i18n-markdown/i18n-markdown.component';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';
import { TimepickerComponent } from './components/timepicker/timepicker.component';

//import {NgxMdModule} from 'ngx-md';

@NgModule({
  declarations: [
    TimepickerComponent,
    ColorpickerComponent,
    ConfirmDialogComponent,
    InfoDialogComponent,
    I18nMarkdownComponent
  ],
  exports: [
    ColorpickerComponent,
    ConfirmDialogComponent,
    OCUiModule,
    TranslateModule,
    InfoDialogComponent,
    I18nMarkdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    OCMaterialModule,
    OCUiModule,
    FlexLayoutModule,
    // NgxMdModule
  ]
})
export class SharedModule {
}
