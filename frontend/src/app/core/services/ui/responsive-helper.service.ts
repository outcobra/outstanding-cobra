import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MATERIALIZE_MIN_WIDTH_LARGE, MATERIALIZE_MIN_WIDTH_MEDIUM, MOBILE_DIALOG} from '../../util/const';
import {MdDialogConfig} from '@angular/material';
import {Orientation} from './Orientation';
import {isNotNull} from '../../util/helper';

@Injectable()
export class ResponsiveHelperService {
    private _mobile: boolean;

    constructor() {
        this._mobile = this._checkMobile();
    }

    public listenForResize(): Observable<any> {
        return Observable.fromEvent(window, 'resize')
            .do(() => this._mobile = this._checkMobile());
    }

    public listenForOrientationChange(): Observable<Orientation> {
        return Observable.fromEvent(window, 'orientationchange')
            .distinctUntilChanged()
            .debounceTime(200)
            .map(() => {
                // That's weird......but in another way the compiler won't compile ¯\_(ツ)_/¯
                let orientation = isNotNull(window.screen) ? (window.screen as any).orientation.angle : window.orientation;
                if (Math.abs(orientation) === Orientation.LANDSCAPE) {
                    return Orientation.LANDSCAPE
                }
                return Orientation.PORTRAIT
            });
    }

    public getMobileOrGivenDialogConfig(config: MdDialogConfig) {
        if (window.innerWidth < MATERIALIZE_MIN_WIDTH_MEDIUM) {
            return MOBILE_DIALOG
        }
        return config;
    }

    public isTouchDevice(): boolean {
        return 'ontouchstart' in window;
    }

    private _checkMobile(): boolean {
        return window.innerWidth < MATERIALIZE_MIN_WIDTH_LARGE;
    }

    public isMobile(): boolean {
        return this._mobile;
    }
}
