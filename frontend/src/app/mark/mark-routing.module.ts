import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../core/services/auth/auth-guard.service';
import {MarkComponent} from './mark.component';
import {MarkSemesterComponent} from './mark-semester/mark-semester.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'mark',
                component: MarkComponent,
                canActivate: [AuthGuard],
                children: [
                    {
                        path: 'semester/:id',
                        component: MarkSemesterComponent
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class MarkRoutingModule {
}
