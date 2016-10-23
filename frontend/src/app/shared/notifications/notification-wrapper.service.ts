import {Injectable} from "@angular/core";
import {NotificationsService, Notification, Icons} from "angular2-notifications";
import {TranslateService} from "ng2-translate";
import * as _ from "underscore";

import "rxjs/add/operator/toPromise";
import {appIcons} from "./icons";

@Injectable()
export class NotificationWrapperService extends NotificationsService {

    private _defaultOptions = {
        timeOut: 7500,
        showProgressBar: true,
        lastOnBottom: true,
        clickToClose: true
    };
    private ic: Icons = appIcons;

    constructor(private _translateService: TranslateService) {
        super();
    }

    success(title: string, content: string, optionsOverride?: any): Notification {
        return this.create(title, content, 'success', this.ic.success, optionsOverride);
    }

    error(title: string, content: string, optionsOverride?: any): Notification {
        return this.create(title, content, 'error', this.ic.error, optionsOverride);
    }

    alert(title: string, content: string, optionsOverride?: any): Notification {
        return this.create(title, content, 'alert', this.ic.alert, optionsOverride);
    }

    info(title: string, content: string, optionsOverride?: any): Notification {
        return this.create(title, content, 'info', this.ic.info, optionsOverride);
    }

    create(title: string, content: string, type: string, icon: string, optionsOverride?: any): Notification {
        return super.set({
                title: this._translateService.instant(title),
                content: this._translateService.instant(content),
                type: type,
                icon: icon,
                override: this.mergeOptions(optionsOverride)
            }, true);
    }

    mergeOptions(optionsOverride: any) {
        return _.extend(this._defaultOptions, optionsOverride);
    }
}
