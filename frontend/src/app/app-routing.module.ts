import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FallbackComponent} from './main/fallback/fallback.component';
import {AppLayoutComponent} from './layout/app-layout/app-layout.component';
import {AuthGuard} from './core/services/auth/auth-guard.service';
import {publicRoutes} from './public-routes';
import {environment} from '../environments/environment';

@NgModule({
    imports: [
        RouterModule.forRoot([
                {
                    path: '',
                    data: {
                        animation: 'empty'
                    },
                    children: publicRoutes
                },
                {
                    path: '',
                    component: AppLayoutComponent,
                    data: {
                        animation: 'app'
                    },
                    children: [
                        {
                            path: 'exam',
                            loadChildren: () => import('app/exam/exam.module').then(m => m.ExamModule),
                            canActivate: [AuthGuard],
                            canActivateChild: [AuthGuard],
                            canLoad: [AuthGuard]
                        },
                        {
                            path: 'mark',
                            loadChildren: () => import('app/mark/mark.module').then(m => m.MarkModule),
                            canActivate: [AuthGuard],
                            canActivateChild: [AuthGuard],
                            canLoad: [AuthGuard]
                        },
                        {
                            path: 'task',
                            loadChildren: () => import('app/task/task.module').then(m => m.TaskModule),
                            canActivate: [AuthGuard],
                            canActivateChild: [AuthGuard],
                            canLoad: [AuthGuard]
                        },
                        {
                            path: 'manage',
                            loadChildren: () => import('app/manage/manage.module').then(m => m.ManageModule),
                            canActivate: [AuthGuard],
                            canActivateChild: [AuthGuard],
                            canLoad: [AuthGuard]
                        }
                    ]
                },
                {
                    path: '**',
                    component: FallbackComponent
                }
            ],
            {
    // Prints all Routing Events
    enableTracing: environment.enableRouteTracing,
    relativeLinkResolution: 'legacy'
})
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
