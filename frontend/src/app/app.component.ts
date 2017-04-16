import {
    AfterContentChecked,
    AfterViewInit,
    Component,
    HostBinding,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {AuthService} from './shared/services/auth/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {ResponsiveHelperService} from './shared/services/ui/responsive-helper.service';
import {Util} from './shared/util/util';
import {MdSidenav, OverlayContainer} from '@angular/material';
import {OCTheme} from './oc-ui/theme/oc-theme';

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

    public activeTheme: OCTheme;
    public allThemes: Array<OCTheme> = OCTheme.values();

    @ViewChild(MdSidenav) public sidenav: MdSidenav;

    public isEnglish: boolean = this.translateService.currentLang == 'en';

    constructor(private translateService: TranslateService,
                public auth: AuthService,
                public responsiveHelper: ResponsiveHelperService,
                private overlayContainer: OverlayContainer) {
    }

    ngOnInit() {
        this.recheckMobile();
        this.changeTheme(this.getThemeFromLocalStorage() || OCTheme.OCEAN);
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

    @HostBinding('class')
    public get activeThemeClass(): string {
        return this.activeTheme.className;
    }

    public changeTheme(theme: OCTheme) {
        if (this.overlayContainer) {
            this.overlayContainer.themeClass = theme.className;
        }

        this.activeTheme = theme;
        localStorage.setItem('oc-theme', this.activeTheme.i18nKey);
    }

    private getThemeFromLocalStorage(): OCTheme {
        let i18nKey = localStorage.getItem('oc-theme');
        return OCTheme.getByI18nKey(i18nKey);
    }
}
