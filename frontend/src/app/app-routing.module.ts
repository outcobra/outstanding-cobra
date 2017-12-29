import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FallbackComponent} from './main/fallback/fallback.component';
import {EmptyLayoutComponent} from './layout/empty-layout/empty-layout.component';
import {AppLayoutComponent} from './layout/app-layout/app-layout.component';
import {AuthGuard} from './core/services/auth/auth-guard.service';
import {authRoutes} from './auth/auth-routes';
import {environment} from '../environments/environment';
import {mainRoutes} from './main/main-routes';

@NgModule({
    imports: [
        RouterModule.forRoot([
                {
                    path: '',
                    component: EmptyLayoutComponent,
                    children: authRoutes.concat(mainRoutes),
                    data: {
                        animation: 'empty'
                    }
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
