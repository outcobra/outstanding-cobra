import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Http} from '@angular/http';

@Injectable()
export class ConfigService {
    private _env: Object;
    private _config: Object;
    private static _variableMap = {
        '{{host}}': () => window.location.host,
        '{{scheme}}': () => {
            let protocol = window.location.protocol;
            return protocol.substring(0, protocol.length - 1)
        }
    };

    constructor(private http: Http) {
        this._env = environment;
    }

    public load() {
        return this.http.get(`assets/config/${this._env['envName']}.json`)
            .map(response => response.json())
            .map(config => ConfigService.deepReplaceValues(config))
            .do(config => this._config = config);
    }

    public getEnv(key: any) {
        return this._env[key];
    }

    public get(key: string, obj: Object = this._config) {
        if (key.indexOf('.') == -1) {
            return obj[key];
        } else {
            let keys = key.split('.');
            let firstKey = keys[0];
            let nextKey = keys[1];
            return this.get(nextKey, obj[firstKey]);
        }
    }

    private static deepReplaceValues(value: any): Object {
        // This is apparently a bug...? https://github.com/mean-expert-official/loopback-sdk-builder/issues/371
        let type: string = typeof value;
        if (value instanceof Array) {
            return value.map(entry => ConfigService.deepReplaceValues(entry));
        } else if (type === 'object') {
            let newObject = {};

            for (let key in value) {
                newObject[key] = ConfigService.deepReplaceValues(value[key]);
            }

            return newObject;
        } else if (type === 'string') {
            return ConfigService.replaceVariablesInString(value);
        }

        return value;
    }

    private static replaceVariablesInString(value: string): string {
        for (let key in this._variableMap) {
            value = value.replace(key, this._variableMap[key]());
        }
        return value;
    }

    protected set env(value: Object) {
        this._env = value;
    }

    protected set config(value: Object) {
        this._config = value;
    }
}
