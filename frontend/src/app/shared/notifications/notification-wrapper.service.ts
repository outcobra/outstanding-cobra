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

    success(title: string, content: string, override?: any): Notification {
        return this.create(title, content, 'success', this.ic.success, override);
    }

    error(title: string, content: string, override?: any): Notification {
        return this.create(title, content, 'error', this.ic.error, override);
    }

    alert(title: string, content: string, override?: any): Notification {
        return this.create(title, content, 'alert', this.ic.alert, override);
    }

    info(title: string, content: string, override?: any): Notification {
        return this.create(title, content, 'info', this.ic.info, override);
    }

    create(title: string, content: string, type: string, icon: string, override?: any): Notification {
        return super.set({
                title: this._translateService.instant(title),
                content: this._translateService.instant(content),
                type: type,
                icon: icon,
                override: this.mergeOptions(override)
            }, true);
    }

    mergeOptions(override: any) {
        return _.extend(this._defaultOptions, override);
    }
}
