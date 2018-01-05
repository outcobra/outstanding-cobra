import {Injectable} from '@angular/core';
import {decode} from 'jwt-simple';
import {environment} from '../../../../environments/environment';
import {isEmpty, isFalsy, isNotEmpty} from '../../util/helper';
import * as moment from 'moment';

@Injectable()
export class JwtHelperService {
    constructor() {
    }

    public isTokenExpired(token: string = this.getToken()): boolean {
        if (isEmpty(token)) {
            return true;
        }
        try {
            let decoded = decode(token, '', true);
            if (isFalsy(decoded['exp'])) {
                return true;
            }
            return moment.unix(decoded['exp']).isBefore(moment());
        } catch (e) {
            return false;
        }
    }

    public hasToken(): boolean {
        return isNotEmpty(localStorage.getItem(environment.locStorage.tokenLocation));
    }

    public getToken() {
        return localStorage.getItem(environment.locStorage.tokenLocation);
    }
}
