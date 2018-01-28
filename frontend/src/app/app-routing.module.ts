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
                            loadChildren: 'app/exam/exam.module#ExamModule',
                            canActivate: [AuthGuard],
                            canActivateChild: [AuthGuard],
                            canLoad: [AuthGuard]
                        },
                        {
                            path: 'mark',
                            loadChildren: 'app/mark/mark.module#MarkModule',
                            canActivate: [AuthGuard],
                            canActivateChild: [AuthGuard],
                            canLoad: [AuthGuard]
                        },
                        {
                            path: 'task',
                            loadChildren: 'app/task/task.module#TaskModule',
                            canActivate: [AuthGuard],
                            canActivateChild: [AuthGuard],
                            canLoad: [AuthGuard]
                        },
                        {
                            path: 'manage',
                            loadChildren: 'app/manage/manage.module#ManageModule',
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
                enableTracing: environment.enableRouteTracing
            })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
