import {DialogMode} from '../common/DialogMode';

export class ManageDialog<T, E> {

    private _mode: DialogMode;
    private _params: T;
    private _parent: E;

    public init(mode: DialogMode, parent: E, params?: T): void {
        this._mode = mode;
        this._parent = parent;
        if (params) {
            this._params = params;
        }
    }

    get parent(): E {
        return this._parent;
    }

    get mode(): DialogMode {
        return this._mode;
    }

    get params(): T {
        return this._params;
    }

    isEditMode(): boolean {
        return this.mode == DialogMode.EDIT;
    }
}
