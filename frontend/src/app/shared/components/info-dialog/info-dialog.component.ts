import {Component, ViewEncapsulation} from '@angular/core';
import {Info} from '../../../core/model/info.dto';

@Component({
    selector: 'info-dialog',
    templateUrl: './info-dialog.component.html',
    styleUrls: ['./info-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InfoDialogComponent {
    private _info: Info;

    get info(): Info {
        return this._info;
    }

    set info(value: Info) {
        this._info = value;
    }
}
