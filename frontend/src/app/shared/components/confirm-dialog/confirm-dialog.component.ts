import {Component} from '@angular/core';

@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
    private _title: string;
    private _message: string;
    private _result: any;
    private _cancelable: boolean;
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

    get cancelable(): boolean {
        return this._cancelable;
    }


    set cancelable(value: boolean) {
        this._cancelable = value;
    }

    get result(): any {
        return this._result;
    }

    set result(value: any) {
        this._result = value;
    }
}
