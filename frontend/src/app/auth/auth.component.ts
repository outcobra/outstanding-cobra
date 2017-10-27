import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    constructor(private _router: Router) {
    }

    ngOnInit() {
    }

    login() {
        this._router.navigate(['/login']);
    }

}
