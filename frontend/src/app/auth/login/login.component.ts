import {Component, OnInit} from '@angular/core';
import {Auth0AuthService} from '../../core/services/auth/auth.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private _authService: Auth0AuthService) {
    }

    ngOnInit() {
    }
}
