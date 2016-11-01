import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {MainComponent} from "./main.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "../shared/services/auth/auth-guard.service";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: MainComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [AuthGuard]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule {
}
