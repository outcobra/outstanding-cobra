import {NgModule} from '@angular/core';
import {ColorPipe} from './services/color.pipe';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ColorPipe
    ],
    exports: [
        ColorPipe
    ]
})
export class PipeModule {
}
