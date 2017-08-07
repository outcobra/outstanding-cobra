import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OCTitleBarComponent} from './components/oc-title-bar/oc-title-bar.component';
import {OCIconDataDataDirective, OCIconDataTitleDirective} from './components/oc-icon-data/oc-icon-data-directives';
import {OCIconDataChildComponent} from './components/oc-icon-data/oc-icon-data-child/oc-icon-data-child.component';
import {OCIconDataComponent} from './components/oc-icon-data/oc-icon-data/oc-icon-data.component';
import {OCFooterComponent} from './components/oc-footer/oc-footer.component';
import {
    OCCollapsibleBodyComponent,
    OCCollapsibleComponent,
    OCCollapsibleHeaderComponent
} from './components/oc-collapsible/oc-collapsible';
import {OCDividerDirective} from './directives/oc-divider.directive';
import {TranslateModule} from '@ngx-translate/core';
import {OCNavComponent} from './components/oc-nav/oc-nav.component';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {OCMaterialModule} from '../oc-material.module';
import {OCEntityMenuComponent} from './components/oc-entity-menu/oc-entity-menu.component';
import { OCFilterSearchComponent } from './components/oc-filter-search/oc-filter-search.component';
import { OCFilterDirective } from './components/oc-filter-search/oc-filter.directive';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        OCMaterialModule,
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
        OCFilterDirective
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
        OCFilterDirective
    ]
})
export class OCUiModule {
}
