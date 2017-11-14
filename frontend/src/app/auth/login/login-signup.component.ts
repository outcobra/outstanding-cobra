import {Component, OnInit} from '@angular/core';
import {Auth0AuthService} from '../../core/services/auth/auth.service';
import {IdentityProvider} from '../../core/services/auth/identity-provider';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OCValidators} from '../../core/services/oc-validators';

@Component({
    selector: 'login',
    templateUrl: './login-signup.component.html',
    styleUrls: ['./login-signup.component.scss']
})
export class LoginSignUpComponent implements OnInit {
    public isSignUp: boolean;

    public provider = IdentityProvider;

    private _loginSignUpForm: FormGroup;

    constructor(private _authService: Auth0AuthService,
                private _route: ActivatedRoute,
                private _formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.isSignUp = this._route.snapshot.data['isSignUp'] || false;
        this._loginSignUpForm = this._formBuilder.group({
            mail: ['',Validators.compose([Validators.required, Validators.email])],
            username: ['', Validators.compose([Validators.maxLength(50), Validators.minLength(4), Validators.required])],
            password: this._formBuilder.group({
                password: ['', Validators.compose([Validators.pattern(''), Validators.required])],
                passwordVerify: this.isSignUp ? ['', Validators.required] : undefined
            }, {
                validator: this.isSignUp ? OCValidators.equals('password', 'passwordVerify') : undefined
            })
        });
    }

    public login(identityProvider: IdentityProvider) {
        this._authService.loginIdentityProvider(identityProvider);
    }

    get loginSignUpForm(): FormGroup {
        return this._loginSignUpForm;
    }
}
