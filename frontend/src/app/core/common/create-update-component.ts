import {ViewMode} from './view-mode';
import {Moment} from 'moment';
import {DateUtil} from '../services/date-util.service';

export class CreateUpdateComponent<T> {
    private _mode: ViewMode;
    private _param: T;

    constructor(mode: ViewMode = ViewMode.NEW, param?: T) {
        this.init(mode, param);
    }

    public init(mode: ViewMode, param?: T): void {
        this._mode = mode;
        if (param) {
            this._param = param;
        }
    }

    protected getDateParamOrDefault(propertyPath: string, defaultValue: Moment | string = '') {
        return DateUtil.transformToMomentIfPossible(this.getParamOrDefault(propertyPath, defaultValue))
    }

    protected getParamOrDefault(propertyPath: string, defaultValue: any = '') {
        if (!this.isEditMode()) {
            return defaultValue;
        }
        if (!propertyPath.includes('.') && this.param.hasOwnProperty(propertyPath)) {
            return this.param[propertyPath];
        }
        let prop = this.param;
        for (let pathPart of propertyPath.split('.')) {
            if (!prop.hasOwnProperty(pathPart)) return defaultValue;
            prop = prop[pathPart];
        }
        return prop;
    }

    protected isEditMode(): boolean {
        return this.mode == ViewMode.EDIT;
    }

    get mode(): ViewMode {
        return this._mode;
    }

    get param(): T {
        return this._param;
    }
}
