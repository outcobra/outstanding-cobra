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
                children: authRoutes
            },
            {
                path: '',
                component: AppLayoutComponent,
                children: [
                    {
                        path: 'exam',
                        loadChildren: 'app/exam/exam.module#ExamModule'
                    },
                    {
                        path: 'mark',
                        loadChildren: 'app/mark/mark.module#MarkModule'
                    },
                    {
                        path: 'task',
                        loadChildren: 'app/task/task.module#TaskModule'
                    },
                    {
                        path: 'manage',
                        loadChildren: 'app/manage/manage.module#ManageModule'
                    }
                ],
                canActivate: [AuthGuard]
            },
            {
                path: '**',
                component: FallbackComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
