import {Injectable} from '@angular/core';
import {AppService} from './core/app.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService extends AppService {
    constructor(http: HttpClient) {
        super(http, '/api/user');
    }

    public checkMailNotTaken(mail: string): Observable<boolean> {
        return this._http.post<boolean>(`${this._baseUri}/emailAvailable`, mail, {
            headers: {
                'Content-Type': 'text/plain'
            }
        });
    }
}
