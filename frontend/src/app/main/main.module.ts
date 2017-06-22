import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MainRoutingModule} from './main-routing.module';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {AuthGuard} from '../core/services/auth/auth-guard.service';
import {OCMaterialModule} from '../oc-material.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MainRoutingModule,
        OCMaterialModule,
        SharedModule
    ],
    declarations: [
        MainComponent,
        DashboardComponent
    ],
    providers: [
        AuthGuard
    ]
})
export class MainModule {
}
