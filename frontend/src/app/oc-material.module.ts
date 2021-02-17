import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MAT_DATE_FORMATS, MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OC_DATE_FORMATS } from './core/common/oc-date-formats';

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
