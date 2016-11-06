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

    private icns: Icons = appIcons; // can't name it icons because of super class

    constructor(private translateService: TranslateService) {
        super();
    }

    success(title: string, content: string, optionsOverride?: any): Notification {
        return this.create(title, content, 'success', this.icns.success, optionsOverride);
    }

    error(title: string, content: string, optionsOverride?: any): Notification {
        return this.create(title, content, 'error', this.icns.error, optionsOverride);
    }

    alert(title: string, content: string, optionsOverride?: any): Notification {
        return this.create(title, content, 'alert', this.icns.alert, optionsOverride);
    }

    info(title: string, content: string, optionsOverride?: any): Notification {
        return this.create(title, content, 'info', this.icns.info, optionsOverride);
    }

    create(title: string, content: string, type: string, icon: string, optionsOverride?: any): Notification {
        return super.set({
                title: this.translateService.instant(title),
                content: this.translateService.instant(content),
                type: type,
                icon: icon,
                override: this.mergeOptions(optionsOverride)
            }, true);
    }

    mergeOptions(optionsOverride: any) {
        return _.extend(this._defaultOptions, optionsOverride);
    }
}
