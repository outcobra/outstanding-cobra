import {Component, OnInit} from '@angular/core';
import {Auth0AuthService} from '../../core/services/auth/auth.service';
import {IdentityProvider} from '../../core/services/auth/identity-provider';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public provider = IdentityProvider;

    constructor(private _authService: Auth0AuthService) {
    }

    ngOnInit() {
    }

    public login(identityProvider: IdentityProvider) {
        this._authService.loginIdentityProvider(identityProvider);
    }
}
