import {Injectable} from '@angular/core';
import {Icons, Notification, NotificationsService, NotificationType} from 'angular2-notifications';
import {TranslateService} from '@ngx-translate/core';
import {appIcons} from './icons';

@Injectable()
export class NotificationWrapperService {

    private _defaultOptions = {
        timeOut: 7500,
        showProgressBar: true,
        lastOnBottom: true,
        clickToClose: true,
        animate: 'fromRight',
        theClass: 'oc-notification'
    };

    private _icns: Icons = appIcons; // can't name it icons because of super class

    constructor(private _translateService: TranslateService, private _notificationsService: NotificationsService) {
    }

    /**
     * shows a success notification
     *
     * @param title
     * @param content
     * @param optionsOverride
     * @returns {Notification}
     */
    public success(title: string, content: string, optionsOverride?: any): Notification {
        return this.create(title, content, NotificationType.Success, this._icns.success, optionsOverride);
    }

    /**
     * shows a error notification
     *
     * @param title
     * @param content
     * @param optionsOverride
     * @returns {Notification}
     */
    public error(title: string, content: string, optionsOverride?: any): Notification {
        return this.create(title, content, NotificationType.Error, this._icns.error, optionsOverride);
    }

    /**
     * shows a alert notification
     *
     * @param title
     * @param content
     * @param optionsOverride
     * @returns {Notification}
     */
    public alert(title: string, content: string, optionsOverride?: any): Notification {
        return this.create(title, content, NotificationType.Alert, this._icns.alert, optionsOverride);
    }

    /**
     * shows a info notification
     *
     * @param title
     * @param content
     * @param optionsOverride
     * @returns {Notification}
     */
    public info(title: string, content: string, optionsOverride?: any): Notification {
        return this.create(title, content, NotificationType.Info, this._icns.info, optionsOverride);
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
    public create(title: string, content: string, type: NotificationType, icon: string, optionsOverride?: any): Notification {
        return this._notificationsService.set({
            title: this._translateService.instant(title),
            content: this._translateService.instant(content),
            type: type,
            icon: icon,
            override: this._mergeOptions(optionsOverride)
        }, true);
    }

    public remove(id?: string) {
        if (id) this._notificationsService.remove(id);
        else this._notificationsService.remove();
    }

    /**
     * overrides the _defaultOptions in this class with the provided options
     *
     * @param optionsOverride
     * @returns {any}
     */
    private _mergeOptions(optionsOverride: any) {
        return Object.assign(this._defaultOptions, optionsOverride);
    }
}
