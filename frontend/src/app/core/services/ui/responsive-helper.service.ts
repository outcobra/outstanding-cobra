
import {fromEvent as observableFromEvent, Observable} from 'rxjs';

import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {MOBILE_DIALOG} from '../../util/const';
import {MatDialogConfig} from '@angular/material';
import {Orientation} from './orientation';
import {isFalsy} from '../../util/helper';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {OCMediaChange} from './oc-media-change';

@Injectable()
export class ResponsiveHelperService {
    private _mobile: boolean;
    private _mediaChange: Observable<OCMediaChange>;

    constructor(private _observableMedia: ObservableMedia) {
        this._mobile = this._checkMobile();
        this._mediaChange = this._observableMedia.asObservable().pipe(
            map(change => this._makeMediaChange(change)));
        this._mediaChange.subscribe((change) => this._mobile = change.mobile);
    }

    public listenForBreakpointChange(): Observable<OCMediaChange> {
        return this._mediaChange;
    }

    public listenForOrientationChange(): Observable<OCMediaChange> {
        return observableFromEvent(window, 'orientationchange').pipe(
            distinctUntilChanged(),
            debounceTime(200),
            map(() => this._makeMediaChange(null)),);
    }

    public getMobileOrGivenDialogConfig(config: MatDialogConfig) {
        if (!this._observableMedia.isActive('gt-sm')) {
            return MOBILE_DIALOG;
        }
        return config;
    }

    public isTouchDevice(): boolean {
        return 'ontouchstart' in window;
    }

    private _checkMobile(): boolean {
        return !this._observableMedia.isActive('gt-sm');
    }

    public getCurrentOrientation(): Orientation {
        let orientation = (window.screen as any).orientation;
        if (isFalsy(orientation) || Math.abs(orientation.angle) === Orientation.LANDSCAPE) {
            return Orientation.LANDSCAPE
        }
        return Orientation.PORTRAIT
    }

    private _makeMediaChange(change?: MediaChange): OCMediaChange {
        return {
            mobile: this._checkMobile(),
            width: window.innerWidth,
            orientation: this.getCurrentOrientation(),
            originalChange: change
        } as OCMediaChange;
    }

    public isMobile(): boolean {
        return this._mobile;
    }
}
