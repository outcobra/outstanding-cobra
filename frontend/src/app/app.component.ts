import {
    AfterContentChecked,
    AfterViewInit,
    Component,
    HostBinding,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { AuthService } from './shared/services/auth/auth.service';
import { TranslateService } from 'ng2-translate';
import { ResponsiveHelperService } from './shared/services/ui/responsive-helper.service';
import { Util } from './shared/util/util';
import { MdSidenav } from '@angular/material';
import { OCTheme } from './oc-ui/theme/oc-theme';
import { NavigationEnd, Router } from '@angular/router';
import { isNotNull } from './shared/util/helper';

@Component({
               selector: 'oc-app',
               templateUrl: './app.component.html',
               styleUrls: [ './app.component.scss' ],
               encapsulation: ViewEncapsulation.None
           })
export class AppComponent implements OnInit, AfterViewInit, AfterContentChecked {
    @HostBinding('class.oc-mobile')
    public mobile: boolean;
    public title = 'Outcobra';

    public activeTheme: OCTheme;
    public allThemes: Array<OCTheme> = OCTheme.values();

    @ViewChild(MdSidenav) public sidenav: MdSidenav;

    public isEnglish: boolean = this.translateService.currentLang == 'en';

    private overlayContainer;

    constructor(private translateService: TranslateService,
                public auth: AuthService,
                public responsiveHelper: ResponsiveHelperService,
                private router: Router,
                /*private overlayContainer: OverlayContainer*/) {
    }

    ngOnInit() {
        this.recheckMobile();
        this.changeTheme(this.getThemeFromLocalStorage() || OCTheme.OCEAN);
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .do(() => {
                if (isNotNull(this.sidenav) && this.sidenav.opened) {
                    this.sidenav.close();
                }
            });
    }

    ngAfterViewInit() {
        this.responsiveHelper.listenForResize()
            .subscribe(() => Util.bindAndCall(this.recheckMobile, this));
    }

    ngAfterContentChecked() {
        let overlayContainer = document.getElementsByClassName('cdk-overlay-container');
        if (!this.overlayContainer && overlayContainer.length > 0) {
            this.overlayContainer = overlayContainer.item(0);
            this.overlayContainer.classList.add(this.activeTheme.className);
        }
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
            //this.overlayContainer.themeClass = theme.className; TODO wait for angular/material2 1.0.0-beta.3 to release
            this.overlayContainer.classList.remove(this.activeTheme.className);
            this.overlayContainer.classList.add(theme.className);
            // TODO remove if the condition from above is fulfilled
        }

        this.activeTheme = theme;
        localStorage.setItem('oc-theme', this.activeTheme.i18nKey);
    }

    private getThemeFromLocalStorage(): OCTheme {
        let i18nKey = localStorage.getItem('oc-theme');
        return OCTheme.getByI18nKey(i18nKey);
    }
}
