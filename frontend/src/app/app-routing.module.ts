import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FallbackComponent} from './main/fallback/fallback.component';
import {EmptyLayoutComponent} from './layout/empty-layout/empty-layout.component';
import {AppLayoutComponent} from './layout/app-layout/app-layout.component';
import {AuthGuard} from './core/services/auth/auth-guard.service';
import {authRoutes} from './auth/auth-routes';

@NgModule({
    imports: [
        RouterModule.forRoot([
                {
                    path: '',
                    pathMatch: 'full',
                    redirectTo: 'manage'
                },
                {
                    path: '',
                    component: EmptyLayoutComponent,
                    children: authRoutes,
                    data: {
                        animation: 'empty'
                    }
                },
                {
                    path: '',
                    component: AppLayoutComponent,
                    canActivate: [AuthGuard],
                    canActivateChild: [AuthGuard],
                    data: {
                        animation: 'app'
                    },
                    children: [
                        {
                            path: 'exam',
                            loadChildren: 'app/exam/exam.module#ExamModule',
                            canLoad: [AuthGuard]
                        },
                        {
                            path: 'mark',
                            loadChildren: 'app/mark/mark.module#MarkModule',
                            canLoad: [AuthGuard]
                        },
                        {
                            path: 'task',
                            loadChildren: 'app/task/task.module#TaskModule',
                            canLoad: [AuthGuard]
                        },
                        {
                            path: 'manage',
                            loadChildren: 'app/manage/manage.module#ManageModule',
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
                //enableTracing: environment.enableRouteTracing
            })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
