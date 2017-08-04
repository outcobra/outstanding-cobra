import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FallbackComponent} from './fallback.component';
import {FallbackRoutingModule} from './fallback-routing.module';
import {OCUiModule} from '../oc-ui/oc-ui.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [
        FallbackComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        OCUiModule,
        FallbackRoutingModule
    ]
})
export class FallbackModule {
}
