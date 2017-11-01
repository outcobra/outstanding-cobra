import {Component, OnInit} from '@angular/core';
import {Auth0AuthService} from '../../core/services/auth/auth.service';
import {IdentityProvider} from '../../core/services/auth/identity-provider';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login-signup.component.html',
    styleUrls: ['./login-signup.component.scss']
})
export class LoginSignUpComponent implements OnInit {
    public isSignUp: boolean;

    public provider = IdentityProvider;

    constructor(private _authService: Auth0AuthService,
                private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this.isSignUp = this._route.snapshot.data['isSignUp'] || false;
    }

    public login(identityProvider: IdentityProvider) {
        this._authService.loginIdentityProvider(identityProvider);
    }
}
