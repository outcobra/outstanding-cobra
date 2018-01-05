import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DefaultAuthService} from '../../core/services/auth/auth.service';
import {NavigationStart, Router} from '@angular/router';
import {isTruthy} from '../../core/util/helper';
import {TranslateService} from '@ngx-translate/core';
import {ResponsiveHelperService} from '../../core/services/ui/responsive-helper.service';
import {MatSidenav} from '@angular/material';
import {appLayoutRouteAnimation} from '../../core/animations/animations';
import {RouteAnimationContainer} from '../../core/animations/route-animation-container';

@Component({
    selector: 'app-layout',
    templateUrl: './app-layout.component.html',
    styleUrls: ['./app-layout.component.scss'],
    animations: [appLayoutRouteAnimation]
})
export class AppLayoutComponent extends RouteAnimationContainer implements OnInit, AfterViewInit {
    private _mobile: boolean;

    @ViewChild(MatSidenav) public sidenav: MatSidenav;

    private _isEnglish: boolean = this._translateService.currentLang == 'en';

    constructor(private _translateService: TranslateService,
                private _auth: DefaultAuthService,
                private _responsiveHelper: ResponsiveHelperService,
                private _router: Router) {
        super();
    }

    ngOnInit() {
        this._mobile = this._responsiveHelper.isMobile();
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

    public logout() {
        this._auth.logout();
    }

    public get auth(): DefaultAuthService {
        return this._auth;
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
