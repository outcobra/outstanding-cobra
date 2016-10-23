import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpInterceptor} from "../shared/http/HttpInterceptor";

@Injectable()
export class Config {
    private _env: Object;
    private _config: Object;

    constructor(private _http: HttpInterceptor) {
        this._env = environment;
    }

    load() {
        //noinspection TypeScriptUnresolvedFunction
        return new Promise((resolve) => {
            this._http.get(`assets/config/:envName.json`, {envName: this._env['envName']})
                .subscribe(config => {
                    console.log(config);
                    this._config = config;
                    resolve();
                });
        });
    }

    getEnv(key: any) {
        return this._env[key];
    }

    get(key: string, obj: Object = this._config) {
        if (key.indexOf('.') == -1) {
            return obj[key];
        } else {
            let keys = key.split('.');
            let firstKey = keys[0];
            let nextKey = keys[1];
            return this.get(nextKey, obj[firstKey]);
        }
    }
}
