import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FallbackComponent} from './main/fallback/fallback.component';
import {AuthGuard} from './core/services/auth/auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forRoot([{
            path: '**',
            component: FallbackComponent,
            canActivate: [AuthGuard],

        }])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
