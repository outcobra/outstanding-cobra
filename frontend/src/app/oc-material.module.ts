import {NgModule} from '@angular/core';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatOptionModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import {OC_DATE_FORMATS} from './core/common/oc-date-formats';
import {MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import {OverlayModule} from '@angular/cdk/overlay';

@NgModule({
    imports: [
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        MatButtonToggleModule,
        MatToolbarModule,
        MatSidenavModule,
        MatMenuModule,
        MatOptionModule,
        MatSelectModule,
        MatTooltipModule,
        MatSliderModule,
        MatRippleModule,
        MatListModule,
        MatTabsModule,
        MatDatepickerModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatMomentDateModule,
        MatFormFieldModule,
        OverlayModule
    ],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        MatButtonToggleModule,
        MatToolbarModule,
        MatSidenavModule,
        MatMenuModule,
        MatOptionModule,
        MatSelectModule,
        MatTooltipModule,
        MatSliderModule,
        MatRippleModule,
        MatListModule,
        MatTabsModule,
        MatDatepickerModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatMomentDateModule,
        MatFormFieldModule,
        OverlayModule
    ],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: OC_DATE_FORMATS
        }
    ]
})
export class OCMaterialModule {
}
