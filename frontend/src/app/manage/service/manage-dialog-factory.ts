import {ComponentType, MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {DialogMode} from '../../common/DialogMode';
import {Dto} from '../../common/Dto';
import {ManageDialog} from '../manage-dialog';
import {Injectable} from '@angular/core';
import {ResponsiveHelperService} from '../../shared/services/ui/responsive-helper.service';
import {SMALL_DIALOG} from '../../shared/util/const';

@Injectable()
export class ManageDialogFactory {

    constructor(private dialog: MdDialog,
                private responsiveHelper: ResponsiveHelperService) {
    }

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
        let conf = config || this.responsiveHelper.getMobileOrGivenDialogConfig(SMALL_DIALOG);
        let dialog = this.dialog.open(component, conf);
        dialog.componentInstance.initWithParent(mode, parent, params);
        return dialog;
    }

}
