import {NgModule} from '@angular/core';
import {TaskCreateUpdateComponent} from '../../task/task-create-update/task-create-update.component';
import {InfoDialogComponent} from '../../shared/components/info-dialog/info-dialog.component';
import {ConfirmDialogComponent} from '../../shared/components/confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [
        TaskCreateUpdateComponent,
        InfoDialogComponent,
        ConfirmDialogComponent
    ],
    entryComponents: [
        TaskCreateUpdateComponent,
        InfoDialogComponent,
        ConfirmDialogComponent
    ]
})
export class DialogTestModule {
}
