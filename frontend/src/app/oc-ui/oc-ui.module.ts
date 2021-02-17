import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { OCMaterialModule } from '../oc-material.module';
import { OCAlertComponent } from './components/oc-alert/oc-alert.component';
import {
  OCCollapsibleBodyComponent,
  OCCollapsibleComponent,
  OCCollapsibleHeaderComponent
} from './components/oc-collapsible/oc-collapsible';
import { OCEmptyComponent } from './components/oc-empty/oc-empty.component';
import { OCEntityMenuComponent } from './components/oc-entity-menu/oc-entity-menu.component';
import { OCFilterSearchComponent } from './components/oc-filter-search/oc-filter-search.component';
import { OCFilterDirective } from './components/oc-filter-search/oc-filter.directive';
import { OCFooterComponent } from './components/oc-footer/oc-footer.component';
import { OCIconDataChildComponent } from './components/oc-icon-data/oc-icon-data-child/oc-icon-data-child.component';
import { OCIconDataDataDirective, OCIconDataTitleDirective } from './components/oc-icon-data/oc-icon-data-directives';
import { OCIconDataComponent } from './components/oc-icon-data/oc-icon-data/oc-icon-data.component';
import { OCNavComponent } from './components/oc-nav/oc-nav.component';
import { OCTitleBarComponent } from './components/oc-title-bar/oc-title-bar.component';
import { OCAutoFocusDirective } from './directives/oc-auto-focus.directive';
import { OCDividerDirective } from './directives/oc-divider.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    OCMaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TranslateModule
  ],
  declarations: [
    OCNavComponent,
    OCCollapsibleComponent,
    OCCollapsibleHeaderComponent,
    OCCollapsibleBodyComponent,
    OCFooterComponent,
    OCIconDataComponent,
    OCIconDataChildComponent,
    OCIconDataTitleDirective,
    OCIconDataDataDirective,
    OCTitleBarComponent,
    OCDividerDirective,
    OCEntityMenuComponent,
    OCFilterSearchComponent,
    OCFilterDirective,
    OCAutoFocusDirective,
    OCEmptyComponent,
    OCAlertComponent
  ],
  exports: [
    OCNavComponent,
    OCCollapsibleComponent,
    OCCollapsibleHeaderComponent,
    OCCollapsibleBodyComponent,
    OCFooterComponent,
    OCIconDataComponent,
    OCIconDataChildComponent,
    OCIconDataTitleDirective,
    OCIconDataDataDirective,
    OCTitleBarComponent,
    OCDividerDirective,
    OCEntityMenuComponent,
    OCFilterSearchComponent,
    OCFilterDirective,
    OCAutoFocusDirective,
    OCEmptyComponent,
    OCAlertComponent
  ]
})
export class OCUiModule {
}
