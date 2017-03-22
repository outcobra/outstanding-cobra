import {AfterViewInit, Component, HostBinding, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth/auth.service';
import {TranslateService} from 'ng2-translate';
import {ResponsiveHelperService} from './shared/services/ui/responsive-helper.service';
import {Util} from "./shared/util/util";

@Component({
    selector: 'outcobra-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    @HostBinding('class.outcobra-mobile')
    private mobile: boolean;

    title = 'Outcobra';

    isEnglish: boolean = this.translateService.currentLang == 'en';

    constructor(private translateService: TranslateService,
                private auth: AuthService,
                private responsiveHelper: ResponsiveHelperService) {
    }

    ngOnInit() {
        this.mobile = this.responsiveHelper.isMobile();
    }

    ngAfterViewInit() {
        this.responsiveHelper.listenForResize().subscribe(() => Util.bindAndCall(this.ngOnInit, this));
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
