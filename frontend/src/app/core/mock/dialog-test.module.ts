import {NgModule} from '@angular/core';
import {TaskCreateUpdateDialog} from '../../task/task-create-update-dialog/task-create-update-dialog.component';
import {InfoDialogComponent} from '../../shared/components/info-dialog/info-dialog.component';
import {ConfirmDialogComponent} from '../../shared/components/confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [
        TaskCreateUpdateDialog,
        InfoDialogComponent,
        ConfirmDialogComponent
    ],
    entryComponents: [
        TaskCreateUpdateDialog,
        InfoDialogComponent,
        ConfirmDialogComponent
    ]
})
export class DialogTestModule {
}
