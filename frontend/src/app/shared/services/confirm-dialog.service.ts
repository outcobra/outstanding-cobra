import {Injectable} from '@angular/core';
import {MdDialog} from '@angular/material';
import {Observable} from 'rxjs';
import {ConfirmDialogComponent} from '../components/confirm-dialog/confirm-dialog.component';
import {ResponsiveHelperService} from "./ui/responsive-helper.service";
import {SMALL_DIALOG} from "../util/const";

@Injectable()
export class ConfirmDialogService {

    constructor(private dialogService: MdDialog,
                private responsiveHelper: ResponsiveHelperService) {
    }

    /**
     * opens a confirmation dialog with the provided message and title
     * returns the observable returned by @angular/material-dialog
     *
     * @param title of the dialog
     * @param message of the dialog
     * @returns {Observable<any>}
     */
    public open(title: string, message: string): Observable<boolean> {
        let dialogRef = this.dialogService.open(ConfirmDialogComponent, this.responsiveHelper.getMobileOrGivenDialogConfig(SMALL_DIALOG));
        let component = dialogRef.componentInstance;
        component.title = title;
        component.message = message;
        return dialogRef.afterClosed();
    }


}
