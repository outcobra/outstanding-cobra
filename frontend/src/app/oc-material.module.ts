import {NgModule} from '@angular/core';
import {
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCoreModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule, MdListModule,
    MdMenuModule,
    MdOptionModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdToolbarModule,
    MdTooltipModule
} from '@angular/material';

@NgModule({
    imports: [
        MdCardModule,
        MdButtonModule,
        MdDialogModule,
        MdIconModule,
        MdInputModule,
        MdSlideToggleModule,
        MdButtonToggleModule,
        MdToolbarModule,
        MdSidenavModule,
        MdMenuModule,
        MdOptionModule,
        MdSelectModule,
        MdTooltipModule,
        MdSliderModule,
        MdRippleModule,
        MdListModule,
        MdCoreModule
    ],
    exports: [
        MdCardModule,
        MdButtonModule,
        MdDialogModule,
        MdIconModule,
        MdInputModule,
        MdSlideToggleModule,
        MdButtonToggleModule,
        MdToolbarModule,
        MdSidenavModule,
        MdMenuModule,
        MdOptionModule,
        MdSelectModule,
        MdTooltipModule,
        MdSliderModule,
        MdRippleModule,
        MdListModule,
        MdCoreModule
    ]
})
export class OCMaterialModule {
}
