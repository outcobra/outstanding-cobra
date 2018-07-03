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
import {I18nMarkdownComponent} from './components/i18n-markdown/i18n-markdown.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SemesterChooserComponent} from './components/semester-chooser/semester-chooser.component';
import {NgxMdModule} from 'ngx-md';

@NgModule({
    declarations: [
        TimepickerComponent,
        ColorpickerComponent,
        ConfirmDialogComponent,
        InfoDialogComponent,
        I18nMarkdownComponent,
        SemesterChooserComponent
    ],
    exports: [
        ColorpickerComponent,
        ConfirmDialogComponent,
        OCUiModule,
        TranslateModule,
        InfoDialogComponent,
        I18nMarkdownComponent,
        SemesterChooserComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        OCMaterialModule,
        OCUiModule,
        FlexLayoutModule,
        NgxMdModule
    ],
    entryComponents: [
        ConfirmDialogComponent,
        InfoDialogComponent
    ]
})
export class SharedModule {
}
