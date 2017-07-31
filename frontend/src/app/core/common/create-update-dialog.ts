import {DialogMode} from './dialog-mode';
import {isNull} from '../util/helper';

export class CreateUpdateDialog<T> {
    private _mode: DialogMode;
    private _param: T;

    constructor(mode?: DialogMode, param?: T) {
        this._mode = mode;
        this._param = param;
    }

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

    protected getParamOrDefault(propertyPath: string, defaultValue: any = '') {
        if (!this.isEditMode()) {
            return defaultValue;
        }
        if (!propertyPath.includes('.') && this.param.hasOwnProperty(propertyPath)) {
            return this.param[propertyPath];
        }
        else {
            let prop = this.param;
            for (let pathPart of propertyPath.split('.')) {
                if (!prop.hasOwnProperty(pathPart) || isNull(prop)) return defaultValue;
                prop = prop[pathPart];
            }
            return prop;
        }
    }

    isEditMode(): boolean {
        return this.mode == DialogMode.EDIT;
    }
}
