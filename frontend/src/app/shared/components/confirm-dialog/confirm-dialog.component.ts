import {Component} from "@angular/core";
import {MdDialogRef} from "@angular/material";

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

    public title: string;
    public message: string;

    constructor(private dialogRef: MdDialogRef<ConfirmDialogComponent>) {
    }

    yes() {
        this.dialogRef.close(true);
    }

    no() {
        this.dialogRef.close(false);
    }

    cancel() {
        this.dialogRef.close(null);
    }

}
