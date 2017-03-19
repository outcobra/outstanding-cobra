import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MATERIALIZE_MIN_WIDTH_LARGE, MATERIALIZE_MIN_WIDTH_MEDIUM, MOBILE_DIALOG} from '../../util/const';
import {MdDialogConfig} from '@angular/material';
import {Orientation} from './Orientation';

@Injectable()
export class ResponsiveHelperService {
    private mobile: boolean;

    constructor() {
        this.mobile = this.checkMobile();
    }

    public listenForResize(): Observable<any> {
        return Observable.fromEvent(window, 'resize')
            .do(() => this.mobile = this.checkMobile());
    }

    public listenForOrientationChange(): Observable<Orientation> {
        return Observable.fromEvent(window, 'orientationchange')
            .distinctUntilChanged()
            .debounceTime(200)
            .map(() => {
                // That's weird......but in another way the compiler won't compile ¯\_(ツ)_/¯
                if (Math.abs((window.screen as any ).orientation.angle) === Orientation.LANDSCAPE) {
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

    isTouchDevice(): boolean {
        return 'ontouchstart' in window;
    }

    private checkMobile(): boolean {
        return window.innerWidth < MATERIALIZE_MIN_WIDTH_LARGE;
    }

    public isMobile(): boolean {
        return this.mobile;
    }
}
