import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Http} from '@angular/http';

@Injectable()
export class Config {
    private env: Object;
    private config: Object;

    constructor(private http: Http) {
        this.env = environment;
    }

    load() {
        return this.http.get(`assets/config/${this.env['envName']}.json`)
            .map(response => response.json())
            .do(config => this.config = config);
    }

    getEnv(key: any) {
        return this.env[key];
    }

    get(key: string, obj: Object = this.config) {
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
