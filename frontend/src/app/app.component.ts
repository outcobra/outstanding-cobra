import {AfterViewInit, Component, HostBinding, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Auth0AuthService} from './core/services/auth/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {ResponsiveHelperService} from './core/services/ui/responsive-helper.service';
import {MatIconRegistry, MatSidenav} from '@angular/material';
import {OCTheme} from './oc-ui/theme/oc-theme';
import {NavigationEnd, Router} from '@angular/router';
import {isTruthy} from './core/util/helper';
import {DomSanitizer} from '@angular/platform-browser';
import {OverlayContainer} from '@angular/cdk/overlay';

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

    @ViewChild(MatSidenav) public sidenav: MatSidenav;

    private _isEnglish: boolean = this._translateService.currentLang == 'en';

    constructor(private _translateService: TranslateService,
                private _auth: Auth0AuthService,
                private _responsiveHelper: ResponsiveHelperService,
                private _router: Router,
                private _overlayContainer: OverlayContainer,
                private _sanitizer: DomSanitizer,
                private _matIconRegistry: MatIconRegistry) {
    }

    ngOnInit() {
        this._mobile = this._responsiveHelper.isMobile();
        this.changeTheme(this.getThemeFromLocalStorage() || OCTheme.OCEAN);
        this._router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(() => {
                if (isTruthy(this.sidenav) && this.sidenav.opened) {
                    this.sidenav.close();
                }
            });

        // TODO maybe search a better place to do this
        this._matIconRegistry.addSvgIcon('average', this._sanitizer.bypassSecurityTrustResourceUrl('/assets/img/ic_average.svg'));
    }

    ngAfterViewInit() {
        this._responsiveHelper.listenForBreakpointChange()
            .subscribe((change) => this._mobile = change.mobile);
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
            this._overlayContainer.getContainerElement().classList.add(theme.className);
        }

        this._activeTheme = theme;
        localStorage.setItem(OC_THEME_STORAGE_LOC, this._activeTheme.i18nKey);
    }

    private getThemeFromLocalStorage(): OCTheme {
        let i18nKey = localStorage.getItem(OC_THEME_STORAGE_LOC);
        return OCTheme.getByI18nKey(i18nKey);
    }


    public get auth(): Auth0AuthService {
        return this._auth;
    }


    get allThemes(): Array<OCTheme> {
        return this._allThemes;
    }

    get mobile(): boolean {
        return this._mobile;
    }

    get isEnglish(): boolean {
        return this._isEnglish;
    }

    set isEnglish(value: boolean) {
        this._isEnglish = value;
    }
}
