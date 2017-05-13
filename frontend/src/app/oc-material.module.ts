import {NgModule} from '@angular/core';
import {
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCoreModule, MdDatepickerModule,
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
        MdDatepickerModule,
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
        MdDatepickerModule,
        MdCoreModule
    ]
})
export class OCMaterialModule {
}
