import {AppService} from "./app.service";
import {CrudService} from "./crud.service";
import {Observable} from "rxjs";

export abstract class AppCrudService<T> extends AppService implements CrudService<T> {
    abstract create(arg: T): Observable<T>;
    abstract getById(id: number): Observable<T>;
    abstract getAll(): Observable<T[]>;
    abstract deleteById(id: number): Observable<any>;
    abstract update(arg: T): Observable<T>;
}
