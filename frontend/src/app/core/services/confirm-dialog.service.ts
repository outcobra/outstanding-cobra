
import {first} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';
import {ResponsiveHelperService} from './ui/responsive-helper.service';
import {SMALL_DIALOG} from '../util/const';
import {ConfirmDialogComponent} from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Injectable()
export class ConfirmDialogService {

    constructor(private _dialogService: MatDialog,
                private _responsiveHelper: ResponsiveHelperService) {
    }

    /**
     * opens a confirmation dialog with the provided message and title
     * returns the observable returned by @angular/material-dialog
     *
     * @param title of the dialog
     * @param message of the dialog
     * @param result the result when the user clicks yes
     * @param cancelable decides whether a cancel button should be showed
     * @returns {Observable<any>}
     */
    public open(title: string, message: string, result: any = true, cancelable: boolean = false): Observable<boolean> {
        let dialogRef = this._dialogService.open(ConfirmDialogComponent, this._responsiveHelper.getMobileOrGivenDialogConfig(SMALL_DIALOG));
        let component = dialogRef.componentInstance;
        component.title = title;
        component.message = message;
        component.result = result;
        component.cancelable = cancelable;
        return dialogRef.afterClosed().pipe(first());
    }


}
