import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MATERIALIZE_MIN_WIDTH_LARGE, MATERIALIZE_MIN_WIDTH_MEDIUM, MOBILE_DIALOG} from '../../util/const';
import {MdDialogConfig} from '@angular/material';

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

    public getMobileOrGivenDialogConfig(config: MdDialogConfig) {
        if (window.innerWidth < MATERIALIZE_MIN_WIDTH_MEDIUM) {
            return MOBILE_DIALOG
        }
        return config;
    }

    private checkMobile(): boolean {
        return window.innerWidth < MATERIALIZE_MIN_WIDTH_LARGE;
    }

    public isMobile(): boolean {
        return this.mobile;
    }
}
