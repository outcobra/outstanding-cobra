import {Component} from '@angular/core';
import {TranslateService} from "ng2-translate";
import {NotificationsService} from "angular2-notifications";
import {AuthService} from "./shared/services/auth/AuthService";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Outcobra!';
    date = new Date('2016-10-10');
    minDate = new Date('2016-10-12');
    maxDate = new Date('2018-1-1');
    activeDate: Date;

    constructor(translate: TranslateService, private _n: NotificationsService, private auth: AuthService) {
        translate.setDefaultLang('en');
        //translate.use(translate.getBrowserLang());
        translate.use(translate.getDefaultLang());
    }

    click() {
        this._n.error('demo.error.title', 'demo.error.title');
        this._n.alert('abcdef', 'daskhdkasd');
        this._n.success('abcdef', 'daskhdkasd');
        this._n.info('abcdef', 'daskhdkasd');
    }
}
