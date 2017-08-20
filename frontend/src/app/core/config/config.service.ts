import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Http} from '@angular/http';

@Injectable()
export class ConfigService {
    private _env: Object;
    private _config: Object;
    private _variableMap: {
        '{{this-host}}': () => window.location.host
    };

    constructor(private http: Http) {
        this._env = environment;
    }

    public load() {
        return this.http.get(`assets/config/${this._env['envName']}.json`)
            .map(response => response.json())
            .do(config => this._config = config);
    }

    public getEnv(key: any) {
        return this._env[key];
    }

    public get(key: string, obj: Object = this._config) {
        if (key.indexOf('.') == -1) {
            return this.replaceVariables(obj[key]);
        } else {
            let keys = key.split('.');
            let firstKey = keys[0];
            let nextKey = keys[1];
            return this.get(nextKey, obj[firstKey]);
        }
    }

    private replaceVariables(value: String) {
        let replacedValue = value;
        for (let varName in this._variableMap) {
            replacedValue = replacedValue.replace(varName, this._variableMap[varName]());
        }
        return replacedValue;
    }

    protected set env(value: Object) {
        this._env = value;
    }

    protected set config(value: Object) {
        this._config = value;
    }
}
