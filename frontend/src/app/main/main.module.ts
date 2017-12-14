import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SharedModule} from '../shared/shared.module';
import {OCMaterialModule} from '../oc-material.module';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        OCMaterialModule,
        SharedModule
    ],
    declarations: [
        MainComponent,
        DashboardComponent
    ]
})
export class MainModule {
}
