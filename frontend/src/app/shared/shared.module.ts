import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {TimepickerComponent} from './components/timepicker/timepicker.component';
import {DatepickerComponent} from './components/datepicker/datepicker.component';
import {DaypickerComponent} from './components/datepicker/daypicker.component';
import {YearpickerComponent} from './components/datepicker/yearpicker.component';
import {FormsModule} from '@angular/forms';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {ColorpickerComponent} from './components/colorpicker/colorpicker.component';
import {InfoDialogComponent} from './components/info-dialog/info-dialog.component';
import {OCUiModule} from '../oc-ui/oc-ui.module';
import {DatePickerErrorDirective} from './components/datepicker/datepicker-error.directive';
import {OCMaterialModule} from '../oc-material.module';

@NgModule({
    declarations: [
        TimepickerComponent,
        DatepickerComponent,
        DaypickerComponent,
        DatePickerErrorDirective,
        YearpickerComponent,
        ColorpickerComponent,
        ConfirmDialogComponent,
        InfoDialogComponent
    ],
    exports: [
        DatepickerComponent,
        DatePickerErrorDirective,
        ColorpickerComponent,
        ConfirmDialogComponent,
        OCUiModule,
        TranslateModule,
        InfoDialogComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        OCMaterialModule,
        OCUiModule
    ],
    entryComponents: [
        ConfirmDialogComponent,
        InfoDialogComponent
    ]
})
export class SharedModule {
}
