import {NgModule} from '@angular/core';
import {ColorPipe} from './pipes/color.pipe';
import {CommonModule, DatePipe, DecimalPipe} from '@angular/common';
import {MarkValuePipe} from './pipes/mark-value.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ColorPipe,
        MarkValuePipe
    ],
    exports: [
        ColorPipe,
        MarkValuePipe
    ],
    providers: [
        DatePipe,
        DecimalPipe
    ]
})
export class PipeModule {
}
