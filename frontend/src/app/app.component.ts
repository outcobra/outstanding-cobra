import {AfterViewInit, Component, HostBinding, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthService} from './shared/services/auth/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {ResponsiveHelperService} from './shared/services/ui/responsive-helper.service';
import {MdSidenav, OverlayContainer} from '@angular/material';
import {OCTheme} from './oc-ui/theme/oc-theme';
import {NavigationEnd, Router} from '@angular/router';
import {isNotNull} from './shared/util/helper';

const OC_THEME_STORAGE_LOC = 'oc-theme';
const OC_MOBILE_CLASS = 'oc-mobile';

@Component({
    selector: 'oc-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {
    private _mobile: boolean;

    public title = 'Outcobra';

    private _activeTheme: OCTheme;
    private _allThemes: Array<OCTheme> = OCTheme.values();

    @ViewChild(MdSidenav) public sidenav: MdSidenav;

    private _isEnglish: boolean = this._translateService.currentLang == 'en';

    constructor(private _translateService: TranslateService,
                public _auth: AuthService,
                public _responsiveHelper: ResponsiveHelperService,
                private _router: Router,
                private _overlayContainer: OverlayContainer) {
    }

    ngOnInit() {
        this._recheckMobile();
        this.changeTheme(this.getThemeFromLocalStorage() || OCTheme.OCEAN);
        this._router.events
            .filter(event => event instanceof NavigationEnd)
            .do(() => {
                if (isNotNull(this.sidenav) && this.sidenav.opened) {
                    this.sidenav.close();
                }
            });
    }

    ngAfterViewInit() {
        this._responsiveHelper.listenForResize()
            .subscribe(() => this._recheckMobile());
    }

    private _recheckMobile() {
        this._mobile = this._responsiveHelper.isMobile();
    }

    public changeLang() {
        this._translateService.use(this._isEnglish ? 'en' : 'de');
    }

    public login() {
        this._auth.login();
    }

    public logout() {
        this._auth.logout();
    }

    public openSidenav() {
        if (this.sidenav) {
            this.sidenav.open();
        }
    }

    @HostBinding('class') get hostClasses(): string {
        return this._activeTheme.className + (this._mobile ? (' ' + OC_MOBILE_CLASS) : '');
    }

    public changeTheme(theme: OCTheme) {
        if (this._overlayContainer) {
            this._overlayContainer.themeClass = theme.className;
        }

        this._activeTheme = theme;
        localStorage.setItem(OC_THEME_STORAGE_LOC, this._activeTheme.i18nKey);
    }

    private getThemeFromLocalStorage(): OCTheme {
        let i18nKey = localStorage.getItem(OC_THEME_STORAGE_LOC);
        return OCTheme.getByI18nKey(i18nKey);
    }


    public get auth(): AuthService {
        return this._auth;
    }


    get allThemes(): Array<OCTheme> {
        return this._allThemes;
    }


    get isEnglish(): boolean {
        return this._isEnglish;
    }
}
