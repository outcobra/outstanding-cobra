import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ManagerComponent} from "./manager.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'manage',
                component: ManagerComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ManagerRoutingModule {
}
