import { AfterViewInit, Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { environment } from '../../../environments/environment';

declare let gapi: any;

@Component({
  selector: 'google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['google-login.component.scss']
})
export class GoogleLoginComponent implements AfterViewInit {
  @Input() public isSignUp: boolean;

  @Output('login') private _onLogin: EventEmitter<string> = new EventEmitter<string>();

  private _googleAuth;

  constructor(private _ngZone: NgZone) {
  }

  ngAfterViewInit(): void {
    gapi.load('auth2', () =>
      this._googleAuth = gapi.auth2.init({
        client_id: environment.auth.google.clientId
      })
    );
  }

  login() {
    this._ngZone.runOutsideAngular(() =>
      this._googleAuth.signIn()
        .then(user => user.getAuthResponse().id_token)
        .then(token => this._ngZone.run(() => this._onLogin.emit(token)))
    );
  }
}
