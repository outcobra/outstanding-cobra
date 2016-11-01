import {Component} from '@angular/core';
import {TranslateService} from "ng2-translate";
import {NotificationsService} from "angular2-notifications";
import {AuthService} from "./shared/services/auth/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Outcobra!';
    date = new Date('2016-10-10');
    minDate = new Date('2016-10-12');
    maxDate = new Date('2018-1-1');
    activeDate: Date;

    constructor(translate: TranslateService, private auth: AuthService) {
        translate.setDefaultLang('en');
        translate.use(translate.getBrowserLang());
    }

    login() {
        this.auth.login();
    }

    logout() {
        this.auth.logout();
    }
}
