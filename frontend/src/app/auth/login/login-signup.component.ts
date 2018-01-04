import {Component, OnInit} from '@angular/core';
import {DefaultAuthService} from '../../core/services/auth/auth.service';
import {IdentityProvider} from '../../core/services/auth/identity-provider';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OCValidators} from '../../core/services/oc-validators';
import {UserService} from '../../core/services/user.service';
import {ErrorStateMatcher} from '@angular/material';
import {PasswordVerifyErrorStateMatcher} from './password-verify-error-state-matcher';
import {loginSignupCollapse} from '../../core/animations/animations';
import {AnimationEvent} from '@angular/animations';
import {isFalse, isTrue, isTruthy} from '../../core/util/helper';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {UsernamePasswordDto} from '../model/username-password.dto';

@Component({
    selector: 'login',
    templateUrl: './login-signup.component.html',
    styleUrls: ['./login-signup.component.scss'],
    animations: [loginSignupCollapse]
})
export class LoginSignUpComponent implements OnInit {
    public isSignUp: boolean;

    public provider = IdentityProvider;

    private _loginSignUpForm: FormGroup;
    private _passwordVerifyErrorStateMatcher: ErrorStateMatcher = new PasswordVerifyErrorStateMatcher();

    private _target: string;
    private readonly _defaultTarget = '/manage';

    public readonly errors$: BehaviorSubject<string> = new BehaviorSubject(null);

    constructor(private _authService: DefaultAuthService,
                private _router: Router,
                private _route: ActivatedRoute,
                private _formBuilder: FormBuilder,
                private _userService: UserService) {
    }

    ngOnInit() {
        this.isSignUp = this._route.snapshot.data['isSignUp'] || false;
        this._route.queryParamMap
            .map(map => map.get('target') || this._defaultTarget)
            .subscribe(target => this._target = target);
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

        if (this._authService.isLoggedIn()) {
            this._router.navigateByUrl(this._target);
            return;
        }
    }

    public submit() {
        if (this._loginSignUpForm.valid && this._loginSignUpForm.dirty) {
            let value = this._loginSignUpForm.value;
            let usernamePasswordTuple = {
                username: this.isSignUp ? value.username : undefined,
                mail: value.mail,
                password: value.password.password,
                passwordVerify: this.isSignUp ? value.password.passwordVerify : undefined
            } as UsernamePasswordDto;
            let authFunc: (UsernamePasswordDto) => Observable<boolean> = this.isSignUp
                ? this._authService.signUpWithMailAndPassword
                : this._authService.loginWithMailAndPassword;

            authFunc.call(this._authService, usernamePasswordTuple)
                .catch(this._handleLoginError.bind(this))
                .subscribe();
        }
    }

    public login(identityProvider: IdentityProvider) {
        let authFunc: (UsernamePasswordDto) => Observable<boolean> = this.isSignUp
            ? this._authService.signUpIdentityProvider
            : this._authService.loginIdentityProvider;
        authFunc.call(this._authService, identityProvider)
            .catch(this._handleLoginError.bind(this))
            .subscribe();
    }

    public handleLogin(animationEvent: AnimationEvent) {
        if (isFalse(animationEvent.fromState) && isTrue(animationEvent.toState)) {
            this._router.navigateByUrl(this._target);
        }
    }

    private _handleLoginError(error) {
        if (isTruthy(error.message)) {
            this.errors$.next(error.message);
        }
        return Observable.empty();
    }

    get isLoggedIn(): boolean {
        return this._authService.isLoggedIn();
    }

    get passwordVerifyErrorStateMatcher(): ErrorStateMatcher {
        return this._passwordVerifyErrorStateMatcher;
    }

    get loginSignUpForm(): FormGroup {
        return this._loginSignUpForm;
    }
}
