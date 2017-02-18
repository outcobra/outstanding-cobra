import {DialogMode} from './DialogMode';

export class CreateUpdateDialog<T> {
    private _mode: DialogMode;
    private _param: T;

    public init(mode: DialogMode, param?: T): void {
        this._mode = mode;
        if (param) {
            this._param = param;
        }
    }

    get mode(): DialogMode {
        return this._mode;
    }

    get param(): T {
        return this._param;
    }

    protected getParamOrDefault(propertyPath: string) {
        if (!this.isEditMode()) return '';
        if (!propertyPath.includes('.') && this.param.hasOwnProperty(propertyPath)) return this.param[propertyPath];
        else {
            let prop = this.param;
            for (let pathPart of propertyPath.split('.')) {
                if (!prop.hasOwnProperty(pathPart)) return '';
                prop = prop[pathPart];
            }
            return prop;
        }
    }

    isEditMode(): boolean {
        return this.mode == DialogMode.EDIT;
    }
}
