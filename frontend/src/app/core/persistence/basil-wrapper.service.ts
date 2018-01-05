import {Injectable} from '@angular/core';
import * as Basil from 'basil.js';
import {environment} from '../../../environments/environment';

@Injectable()
export class BasilWrapperService {
    private _basil;

    constructor() {
        this._basil = new Basil(environment.persistence.basilOptions);
    }

    public set(key: string, value: any) {
        this._basil.set(key, value);
    }

    public get(key: string): any {
        return this._basil.get(key);
    }

    public keys(): Array<string> {
        return this._basil.keys();
    }

    public remove(key: string) {
        this._basil.remove(key);
    }
}
