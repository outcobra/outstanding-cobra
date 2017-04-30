import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
    private _title: string;
    private _message: string;

    constructor(private _dialogRef: MdDialogRef<ConfirmDialogComponent>) {
    }

    public yes() {
        this._dialogRef.close(true);
    }

    public no() {
        this._dialogRef.close(false);
    }

    public cancel() {
        this._dialogRef.close(null);
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
