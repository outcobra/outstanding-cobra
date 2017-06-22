import {AppService} from './app.service';
import {CrudService} from './crud.service';
import {Observable} from 'rxjs';

/**
 * Basic implementation of a CrudAppService which connects to the default api
 */
export class AppCrudService<T> extends AppService implements CrudService<T> {
    public create(arg: T): Observable<T> {
        return this._http.put<T>(this._baseUri, arg);
    }

    public readById(id: number): Observable<T> {
        return this._http.get<T>(`${this._baseUri}/${id}`);
    }

    public readAll(): Observable<T[]> {
        return this._http.get<T[]>(this._baseUri);
    }

    public deleteById(id: number): Observable<any> {
        return this._http.delete<any>(`${this._baseUri}/${id}`);
    }

    public update(arg: T): Observable<T> {
        return this._http.post<T>(this._baseUri, arg);
    }
}
