import {NgModule} from '@angular/core';
import {
    MD_DATE_FORMATS,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCoreModule,
    MdDatepickerModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdOptionModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule
} from '@angular/material';
import {OC_DATE_FORMATS} from './core/common/oc-date-formats';

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
        MdTabsModule,
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
        MdTabsModule,
        MdDatepickerModule,
        MdCoreModule
    ],
    providers: [
        {
            provide: MD_DATE_FORMATS,
            useValue: OC_DATE_FORMATS
        }
    ]
})
export class OCMaterialModule {
}
