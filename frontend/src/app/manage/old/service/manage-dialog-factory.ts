import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ViewMode} from '../../../core/common/view-mode';
import {Dto} from '../../../core/common/dto';
import {ParentLinkedCreateUpdateComponent} from '../../../core/common/parent-linked-create-update-component';
import {Injectable} from '@angular/core';
import {ResponsiveHelperService} from '../../../core/services/ui/responsive-helper.service';
import {SMALL_DIALOG} from '../../../core/util/const';
import {ComponentType} from '@angular/cdk/portal';

@Injectable()
export class ManageDialogFactory {

    constructor(private _dialog: MatDialog,
                private _responsiveHelper: ResponsiveHelperService) {
    }

    /**
     * returns a reference to the dialog which was created with the arguments
     *
     * @param component type of the dialog component
     * @param mode of the ManageDialog
     * @param parent dto
     * @param config matDialogConfig for appearance configuration
     * @param params for edit mode
     */
    public getDialog<T extends ParentLinkedCreateUpdateComponent<Dto, Dto>>(component: ComponentType<T>, mode: ViewMode, parent: Dto, config?: MatDialogConfig, params?: Dto): MatDialogRef<T> {
        let conf = config || this._responsiveHelper.getMobileOrGivenDialogConfig(SMALL_DIALOG);
        let dialog = this._dialog.open(component, conf);
        dialog.componentInstance.initWithParent(mode, parent, params);
        return dialog;
    }

}
