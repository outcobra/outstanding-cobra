import {AuthGuard} from '../core/services/auth/auth-guard.service';
import {FallbackComponent} from './fallback.component';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
@NgModule({
    imports: [
        RouterModule.forChild([{
                path: '**',
                component: FallbackComponent,
                canActivate: [AuthGuard]
            }]
        )],
    exports: [
        RouterModule
    ]
})

export class FallbackRoutingModule {

}
