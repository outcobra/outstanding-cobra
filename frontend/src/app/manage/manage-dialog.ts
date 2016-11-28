import {DialogMode} from "../common/DialogMode";
import {Dto} from "../common/Dto";
export class ManageDialog<T> {

    private _mode: DialogMode;
    private _params: T;

    public init(mode: DialogMode, params?: T): void {
        this._mode = mode;
        if (params) {
            this._params = params;
        }
    }

    get mode(): DialogMode {
        return this._mode;
    }

    get params(): T {
        return this._params;
    }
}
