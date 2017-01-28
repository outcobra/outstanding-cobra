import {AppService} from "./app.service";
import {CrudService} from "./crud.service";
import {Observable} from "rxjs";

/**
 * Basic implementation of a CrudAppService which connects to the default api
 */
export class AppCrudService<T> extends AppService implements CrudService<T> {
    create(arg: T): Observable<T> {
        return this.http.put<T>(this.baseUri, arg);
    }

    readById(id: number): Observable<T> {
        return this.http.get<T>(`${this.baseUri}/${id}`);
    }

    readAll(): Observable<T[]> {
        return this.http.get<T[]>(this.baseUri);
    }

    deleteById(id: number): Observable<any> {
        return this.http.delete<any>(`${this.baseUri}/${id}`);
    }

    update(arg: T): Observable<T> {
        return this.http.post<T>(this.baseUri, arg);
    }
}
