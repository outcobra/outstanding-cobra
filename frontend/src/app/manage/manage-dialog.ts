import {DialogMode} from "../common/DialogMode";
import {FormGroup} from "@angular/forms";
import {Util} from "../shared/services/util";

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

    revalidateForm(form: FormGroup) {
        Util.keys(form.controls).forEach((key) => {
            let control = form.controls[key];
            if (!control.valid) {
                control.markAsDirty();
            }
        });
    }
}
