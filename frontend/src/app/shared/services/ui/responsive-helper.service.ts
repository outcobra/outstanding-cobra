import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {MATERIALIZE_MIN_WIDTH_LARGE} from "../../util/const";

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

    private checkMobile(): boolean {
        return window.innerWidth < MATERIALIZE_MIN_WIDTH_LARGE;
    }

    public isMobile(): boolean {
        return this.mobile;
    }
}
