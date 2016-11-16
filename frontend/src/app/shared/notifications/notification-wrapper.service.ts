import {Injectable} from "@angular/core";
import {NotificationsService, Notification, Icons} from "angular2-notifications";
import {TranslateService} from "ng2-translate";
import * as _ from "underscore";

import "rxjs/add/operator/toPromise";
import {appIcons} from "./icons";

@Injectable()
export class NotificationWrapperService extends NotificationsService {

    private defaultOptions = {
        timeOut: 7500,
        showProgressBar: true,
        lastOnBottom: true,
        clickToClose: true
    };

    private icns: Icons = appIcons; // can't name it icons because of super class

    constructor(private translateService: TranslateService) {
        super();
    }

    /**
     * shows a success notification
     *
     * @param title
     * @param content
     * @param optionsOverride
     * @returns {Notification}
     */
    success(title: string, content: string, optionsOverride?: any): Notification {
        return this.create(title, content, 'success', this.icns.success, optionsOverride);
    }

    /**
     * shows a error notification
     *
     * @param title
     * @param content
     * @param optionsOverride
     * @returns {Notification}
     */
    error(title: string, content: string, optionsOverride?: any): Notification {
        return this.create(title, content, 'error', this.icns.error, optionsOverride);
    }

    /**
     * shows a alert notification
     *
     * @param title
     * @param content
     * @param optionsOverride
     * @returns {Notification}
     */
    alert(title: string, content: string, optionsOverride?: any): Notification {
        return this.create(title, content, 'alert', this.icns.alert, optionsOverride);
    }

    /**
     * shows a info notification
     *
     * @param title
     * @param content
     * @param optionsOverride
     * @returns {Notification}
     */
    info(title: string, content: string, optionsOverride?: any): Notification {
        return this.create(title, content, 'info', this.icns.info, optionsOverride);
    }

    /**
     * shows a notification according to the params
     *
     * this method supports i18n in the title and content of the notification
     *
     * @param title of the notification will be tried to translate
     * @param content of the notification will be tried to translate
     * @param type of the notification
     * @param icon
     * @param optionsOverride special options for the notification (overrides default)
     * @returns {Notification}
     */
    create(title: string, content: string, type: string, icon: string, optionsOverride?: any): Notification {
        return super.set({
                title: this.translateService.instant(title),
                content: this.translateService.instant(content),
                type: type,
                icon: icon,
                override: this.mergeOptions(optionsOverride)
            }, true);
    }

    /**
     * overrides the defaultOptions in this class with the provided options
     *
     * @param optionsOverride
     * @returns {any}
     */
    mergeOptions(optionsOverride: any) {
        return _.extend(this.defaultOptions, optionsOverride);
    }
}
