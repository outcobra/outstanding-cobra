import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppLayoutComponent} from './app-layout/app-layout.component';
import {EmptyLayoutComponent} from './empty-layout/empty-layout.component';
import {RouterModule} from '@angular/router';
import {OCMaterialModule} from '../oc-material.module';
import {OCUiModule} from '../oc-ui/oc-ui.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {SimpleNotificationsModule} from 'angular2-notifications/dist';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        OCMaterialModule,
        OCUiModule,
        TranslateModule,
        SimpleNotificationsModule
    ],
    declarations: [
        AppLayoutComponent,
        EmptyLayoutComponent
    ],
    exports: [
        AppLayoutComponent,
        EmptyLayoutComponent
    ]
})
export class LayoutModule {
}
