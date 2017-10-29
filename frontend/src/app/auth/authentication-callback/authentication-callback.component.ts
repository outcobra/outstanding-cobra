import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Auth0AuthService} from '../../core/services/auth/auth.service';
import {isEmpty} from '../../core/util/helper';

@Component({
    selector: 'app-authentication-callback',
    templateUrl: './authentication-callback.component.html',
    styleUrls: ['./authentication-callback.component.scss']
})
export class AuthenticationCallbackComponent implements OnInit {

    constructor(private _authService: Auth0AuthService,
                private _router: Router,
                private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._route.fragment.subscribe(fragment => {
           if (isEmpty(fragment)) {
               this._router.navigate(['/auth']);
           }
            this._authService.authenticate(fragment);
        });
    }

}
