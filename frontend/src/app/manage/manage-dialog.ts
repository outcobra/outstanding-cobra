import {DialogMode} from '../core/common/dialog-mode';
import {CreateUpdateDialog} from '../core/common/create-update-dialog';

export class ManageDialog<T, E> extends CreateUpdateDialog<T> {
    private _parent: E;

    public initWithParent(mode: DialogMode, parent: E, param?: T): void {
        super.init(mode, param);
        this._parent = parent;
    }

    get parent(): E {
        return this._parent;
    }
}
