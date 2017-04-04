import {AfterViewInit, Component, HostBinding, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthService} from './shared/services/auth/auth.service';
import {TranslateService} from 'ng2-translate';
import {ResponsiveHelperService} from './shared/services/ui/responsive-helper.service';
import {Util} from './shared/util/util';
import {MdSidenav} from '@angular/material';

@Component({
    selector: 'oc-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {
    @HostBinding('class.oc-mobile')
    public mobile: boolean;
    public title = 'Outcobra';

    @ViewChild(MdSidenav) public sidenav: MdSidenav;

    public isEnglish: boolean = this.translateService.currentLang == 'en';

    constructor(private translateService: TranslateService,
                public auth: AuthService,
                public responsiveHelper: ResponsiveHelperService) {
    }

    ngOnInit() {
        this.recheckMobile();
    }

    ngAfterViewInit() {
        this.responsiveHelper.listenForResize()
            .subscribe(() => Util.bindAndCall(this.recheckMobile, this));
    }

    private recheckMobile() {
        this.mobile = this.responsiveHelper.isMobile();
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

    openSidenav() {
        if (this.sidenav) {
            this.sidenav.open();
        }
    }
}
