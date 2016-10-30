import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {MainComponent} from "./main.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: MainComponent},
            {path: 'dashboard', component: DashboardComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule {}
