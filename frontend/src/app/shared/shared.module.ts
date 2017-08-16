import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {TimepickerComponent} from './components/timepicker/timepicker.component';
import {FormsModule} from '@angular/forms';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {ColorpickerComponent} from './components/colorpicker/colorpicker.component';
import {InfoDialogComponent} from './components/info-dialog/info-dialog.component';
import {OCUiModule} from '../oc-ui/oc-ui.module';
import {OCMaterialModule} from '../oc-material.module';
import {MarkdownModule} from 'angular2-markdown';
import {I18nMarkdownComponent} from './components/i18n-markdown/i18n-markdown.component';

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
        MarkdownModule
    ],
    entryComponents: [
        ConfirmDialogComponent,
        InfoDialogComponent
    ]
})
export class SharedModule {
}
