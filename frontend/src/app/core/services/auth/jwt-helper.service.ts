import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { BasilWrapperService } from '../../persistence/basil-wrapper.service';
import { isEmpty, isFalsy } from '../../util/helper';

@Injectable()
export class JwtHelperService {
  constructor(private _basil: BasilWrapperService) {
  }

  public isTokenExpired(token: string = this.getToken()): boolean {
    if (isEmpty(token)) {
      return true;
    }
    try {
      let decoded = JSON.parse(atob(token.split('.')[1]));
      if (isFalsy(decoded['exp'])) {
        return true;
      }
      return moment.unix(decoded['exp']).isBefore(moment());
    } catch (e) {
      return true;
    }
  }

  public hasToken(): boolean {
    return this._basil.has(environment.persistence.tokenLocation);
  }

  public getToken() {
    return this._basil.get(environment.persistence.tokenLocation);
  }
}
