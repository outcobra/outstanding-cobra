import {Component} from '@angular/core';

@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
    private _title: string;
    private _message: string;

    constructor() {
    }

    get title(): string {
        return this._title;
    }

    get message(): string {
        return this._message;
    }

    set title(value: string) {
        this._title = value;
    }

    set message(value: string) {
        this._message = value;
    }
}
