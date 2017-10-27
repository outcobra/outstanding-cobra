import {Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';

export const authRoutes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        data: {
            animation: 'auth'
        }
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {
            animation: 'login'
        }
    }
];