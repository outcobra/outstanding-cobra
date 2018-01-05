import {AfterViewInit, Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {DefaultAuthService} from '../../core/services/auth/auth.service';
import {NavigationStart, Router} from '@angular/router';
import {isTruthy} from '../../core/util/helper';
import {OCTheme} from '../../oc-ui/theme/oc-theme';
import {TranslateService} from '@ngx-translate/core';
import {ResponsiveHelperService} from '../../core/services/ui/responsive-helper.service';
import {MatSidenav} from '@angular/material';
import {OverlayContainer} from '@angular/cdk/overlay';
import {appLayoutRouteAnimation} from '../../core/animations/animations';
import {RouteAnimationContainer} from '../../core/animations/route-animation-container';

const OC_THEME_STORAGE_LOC = 'oc-theme';
const OC_MOBILE_CLASS = 'oc-mobile';

@Component({
    selector: 'app-layout',
    templateUrl: './app-layout.component.html',
    styleUrls: ['./app-layout.component.scss'],
    animations: [appLayoutRouteAnimation]
})
export class AppLayoutComponent extends RouteAnimationContainer implements OnInit, AfterViewInit {
    private _mobile: boolean;

    private _activeTheme: OCTheme;
    private _allThemes: Array<OCTheme> = OCTheme.values();

    @ViewChild(MatSidenav) public sidenav: MatSidenav;

    private _isEnglish: boolean = this._translateService.currentLang == 'en';

    constructor(private _translateService: TranslateService,
                private _auth: DefaultAuthService,
                private _responsiveHelper: ResponsiveHelperService,
                private _router: Router,
                private _overlayContainer: OverlayContainer) {
        super();
    }

    ngOnInit() {
        this._mobile = this._responsiveHelper.isMobile();
        this.changeTheme(this.getThemeFromLocalStorage() || OCTheme.OCEAN);
        this._router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe(() => {
                if (isTruthy(this.sidenav) && this.sidenav.opened) {
                    this.sidenav.close();
                }
            });
    }

    ngAfterViewInit(): void {
        this._responsiveHelper.listenForBreakpointChange()
            .subscribe((change) => this._mobile = change.mobile);
    }

    public changeLang() {
        this._translateService.use(this._isEnglish ? 'en' : 'de');
    }

    public openSidenav() {
        if (this.sidenav) {
            this.sidenav.open();
        }
    }

    @HostBinding('class')
    get hostClasses(): string {
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

    public logout() {
        this._auth.logout();
    }

    public get auth(): DefaultAuthService {
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
