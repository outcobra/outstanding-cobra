import {Injectable} from '@angular/core';
import {AppService} from './core/app.service';
import {HttpInterceptor} from '../http/http-interceptor';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService extends AppService {
    constructor(http: HttpInterceptor) {
        super(http, '/api/user');
    }

    public checkMailNotTaken(mail: string): Observable<boolean> {
        return this._http.post(`${this._baseUri}/emailAvailable`, mail, 'outcobra_public', {
            'Content-Type': 'text/plain'
        });
    }
}
