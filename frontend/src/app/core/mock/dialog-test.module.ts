import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent } from '../../shared/components/info-dialog/info-dialog.component';
import { TaskCreateUpdateComponent } from '../../task/task-create-update/task-create-update.component';

@NgModule({
  declarations: [
    TaskCreateUpdateComponent,
    InfoDialogComponent,
    ConfirmDialogComponent
  ]
})
export class DialogTestModule {
}
