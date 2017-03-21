import {AfterViewInit, Component, HostBinding} from '@angular/core';
import {AuthService} from './shared/services/auth/auth.service';
import {TranslateService} from 'ng2-translate';
import {ResponsiveHelperService} from './shared/services/ui/responsive-helper.service';

@Component({
    selector: 'outcobra-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    @HostBinding('class.outcobra-mobile')
    private mobile: boolean;

    title = 'Outcobra';

    isEnglish: boolean = this.translateService.currentLang == 'en';

    constructor(private translateService: TranslateService,
                private auth: AuthService,
                private responsiveHelper: ResponsiveHelperService) {
    }

    ngAfterViewInit() {
        this.responsiveHelper.listenForResize().subscribe(() => this.mobile = this.responsiveHelper.isMobile());
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
