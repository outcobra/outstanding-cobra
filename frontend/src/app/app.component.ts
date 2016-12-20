import {Component, OnInit} from "@angular/core";
import {AuthService} from "./shared/services/auth/auth.service";

@Component({
    selector: 'outcobra-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Outcobra!';

    constructor(private auth: AuthService) {
    }

    ngOnInit(): void {
    }

    login() {
        this.auth.login();
    }

    logout() {
        this.auth.logout();
    }
}
