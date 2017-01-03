import {Observable} from "rxjs";
export interface CrudService<T> {
    create(arg: T): Observable<T>;
    getById(id: number): Observable<T>;
    getAll(): Observable<T[]>;
    deleteById(id: number): Observable<any>;
    update(arg: T): Observable<T>;
}
