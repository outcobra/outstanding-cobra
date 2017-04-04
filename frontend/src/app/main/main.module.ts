import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MainRoutingModule} from './main-routing.module';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {AuthGuard} from '../shared/services/auth/auth-guard.service';
import { OCNavComponent } from './oc-nav/oc-nav.component';
import { OCTitleBarComponent } from './oc-title-bar/oc-title-bar.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MainRoutingModule,
        MaterialModule,
        SharedModule
    ],
    declarations: [
        MainComponent,
        DashboardComponent,
        OCNavComponent,
        OCTitleBarComponent
    ],
    exports: [
        OCNavComponent,
        OCTitleBarComponent
    ],
    providers: [
        AuthGuard
    ]
})
export class MainModule {
}
