import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MainComponent} from './main.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from '../core/services/auth/auth-guard.service';
import {I18nMarkdownComponent} from '../shared/components/i18n-markdown/i18n-markdown.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: MainComponent,
                children: [
                    {
                        path: 'features',
                        component: I18nMarkdownComponent,
                        data: {
                            path: '/assets/docs/features',
                            displayMode: 'card',
                            wrapperClasses: ['container', 'middle-container', 'features-text']
                        }
                    },
                    {
                        path: '',
                        component: I18nMarkdownComponent,
                        data: {
                            path: '/assets/docs/about',
                            displayMode: 'card',
                            wrapperClasses: ['container', 'middle-container']
                        }
                    }
                ]
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [AuthGuard]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule {
}
