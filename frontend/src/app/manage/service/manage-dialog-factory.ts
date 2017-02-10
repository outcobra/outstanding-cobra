import {ComponentType, MdDialogConfig, MdDialogRef, MdDialog} from '@angular/material';
import {DialogMode} from '../../common/DialogMode';
import {Dto} from '../../common/Dto';
import {ManageDialog} from '../manage-dialog';
import {Injectable} from '@angular/core';

@Injectable()
export class ManageDialogFactory {

    constructor(private dialog: MdDialog) {}

    /**
     * returns a reference to the dialog which was created with the arguments
     *
     * @param component type of the dialog component
     * @param mode of the ManageDialog
     * @param parent dto
     * @param config MdDialogConfig for appearance configuration
     * @param params for edit mode
     */
    getDialog<T extends ManageDialog<Dto, Dto>>(component: ComponentType<T>, mode: DialogMode, parent: Dto, config?: MdDialogConfig, params?: Dto): MdDialogRef<T> {
        let dialog = this.dialog.open(component, config);
        dialog.componentInstance.init(mode, parent, params);
        return dialog;
    }

}
