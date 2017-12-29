import {Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {LoginSignUpComponent} from './login/login-signup.component';

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
        component: LoginSignUpComponent,
        data: {
            isSignUp: false,
            animation: 'login'
        }
    },{
        path: 'signup',
        component: LoginSignUpComponent,
        data: {
            isSignUp: true,
            animation: 'signUp'
        }
    },
];
