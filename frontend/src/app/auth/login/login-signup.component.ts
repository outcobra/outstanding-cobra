import {Component, OnInit} from '@angular/core';
import {Auth0AuthService} from '../../core/services/auth/auth.service';
import {IdentityProvider} from '../../core/services/auth/identity-provider';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OCValidators} from '../../core/services/oc-validators';
import {UserService} from '../../core/services/user.service';
import {ErrorStateMatcher} from '@angular/material';
import {PasswordVerifyErrorStateMatcher} from './password-verify-error-state-matcher';

@Component({
    selector: 'login',
    templateUrl: './login-signup.component.html',
    styleUrls: ['./login-signup.component.scss']
})
export class LoginSignUpComponent implements OnInit {
    public isSignUp: boolean;

    public provider = IdentityProvider;

    private _loginSignUpForm: FormGroup;

    private _passwordVerifyErrorStateMatcher: ErrorStateMatcher = new PasswordVerifyErrorStateMatcher();

    constructor(private _authService: Auth0AuthService,
                private _route: ActivatedRoute,
                private _formBuilder: FormBuilder,
                private _userService: UserService) {
    }

    ngOnInit() {
        this.isSignUp = this._route.snapshot.data['isSignUp'] || false;
        this._loginSignUpForm = this._formBuilder.group({
            mail: [
                '',
                Validators.compose([Validators.required, Validators.email]),
                this.isSignUp ? OCValidators.checkMailNotTaken(this._userService) : []
            ],
            username: this.isSignUp ?
                [
                    '',
                    Validators.compose([Validators.maxLength(50), Validators.minLength(4), Validators.required])
                ]
                : undefined,
            password: this._formBuilder.group({
                password: [
                    '',
                    this.isSignUp ?
                        Validators.compose([Validators.pattern(OCValidators.PASSWORD_REGEX), Validators.required])
                        : Validators.required
                ],
                passwordVerify: this.isSignUp ?
                    [
                        '',
                        Validators.required
                    ]
                    : undefined
            }, {
                validator: this.isSignUp ? OCValidators.equals('password', 'passwordVerify') : undefined
            })
        });
    }

    public submit() {
        if (this._loginSignUpForm.valid && this._loginSignUpForm.dirty) {
            let value = this._loginSignUpForm.value;
            this._authService.signUpWithMailAndPassword({
                username: value.username,
                mail: value.mail,
                password: value.password.password
            })
        }
    }

    public login(identityProvider: IdentityProvider) {
        this._authService.loginIdentityProvider(identityProvider);
    }

    get passwordVerifyErrorStateMatcher(): ErrorStateMatcher {
        return this._passwordVerifyErrorStateMatcher;
    }

    get loginSignUpForm(): FormGroup {
        return this._loginSignUpForm;
    }
}
