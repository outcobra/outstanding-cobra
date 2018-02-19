import {Routes} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {LoginSignUpComponent} from './auth/login/login-signup.component';
import {I18nMarkdownComponent} from './shared/components/i18n-markdown/i18n-markdown.component';
import {MainComponent} from './main/main.component';

export const publicRoutes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        data: {
            animation: 'auth'
        }
    },
    {
        path: 'login',
        component: LoginSignUpComponent,
        data: {
            isSignUp: false,
            animation: 'login'
        }
    }, {
        path: 'signup',
        component: LoginSignUpComponent,
        data: {
            isSignUp: true,
            animation: 'signUp'
        }
    },
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
                    wrapperClasses: ['features-text']
                }
            },
            {
                path: '',
                component: I18nMarkdownComponent,
                data: {
                    path: '/assets/docs/about',
                    displayMode: 'card',
                }
            },
            {
                path: 'devs',
                component: I18nMarkdownComponent,
                data: {
                    path: '/assets/docs/profiles',
                    displayMode: 'card',
                }
            }
        ]
    }
];
