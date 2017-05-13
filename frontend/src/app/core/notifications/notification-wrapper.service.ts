import {Injectable} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import {TranslateService} from '@ngx-translate/core';
import 'rxjs/add/operator/toPromise';
import {appIcons} from './icons';
import {Icons, Notification} from 'angular2-notifications/dist';

@Injectable()
export class NotificationWrapperService extends NotificationsService {

    private _defaultOptions = {
        timeOut: 7500,
        showProgressBar: true,
        lastOnBottom: true,
        clickToClose: true,
        animate: 'fromRight'
    };

    private _icns: Icons = appIcons; // can't name it icons because of super class

    constructor(private _translateService: TranslateService) {
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
    public success(title: string, content: string, optionsOverride?: any): Notification {
        return this.create(title, content, 'success', this._icns.success, optionsOverride);
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
        return this.create(title, content, 'error', this._icns.error, optionsOverride);
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
        return this.create(title, content, 'alert', this._icns.alert, optionsOverride);
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
        return this.create(title, content, 'info', this._icns.info, optionsOverride);
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
    public create(title: string, content: string, type: string, icon: string, optionsOverride?: any): Notification {
        return super.set({
            title: this._translateService.instant(title),
            content: this._translateService.instant(content),
            type: type,
            icon: icon,
            override: this._mergeOptions(optionsOverride)
        }, true);
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
