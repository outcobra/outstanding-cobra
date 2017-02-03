import {Component, OnInit} from "@angular/core";
import {AuthService} from "./shared/services/auth/auth.service";
import {TranslateService} from "ng2-translate";

@Component({
    selector: 'outcobra-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Outcobra';
    isEnglish: boolean = this.translateService.currentLang == 'en';

    constructor(private translateService: TranslateService,
                private auth: AuthService) {
    }

    ngOnInit(): void {
    }

    changeLang() {
        this.translateService.use(this.isEnglish ? 'en' : 'de');
    }

    login() {
        this.auth.login();
    }

    logout() {
        this.auth.logout();
    }
}
