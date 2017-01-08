import {Observable} from "rxjs";

export interface CrudService<T> {
    create(arg: T): Observable<T>;
    readById(id: number): Observable<T>;
    readAll(): Observable<T[]>;
    deleteById(id: number): Observable<any>;
    update(arg: T): Observable<T>;
}
