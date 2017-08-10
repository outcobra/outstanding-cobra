import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FallbackComponent} from './main/fallback/fallback.component';

@NgModule({
    imports: [
        RouterModule.forRoot([{
            path: '**',
            component: FallbackComponent
        }])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
