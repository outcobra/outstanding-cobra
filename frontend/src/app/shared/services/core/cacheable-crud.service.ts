import {CrudService} from "./crud.service";
import {Observable} from "rxjs";
import {CacheableService} from "./cacheable.service";

export abstract class CacheableCrudService<T> extends CacheableService<T> implements CrudService<T>{
    abstract create(arg: T): Observable<T>;
    abstract getById(id: number): Observable<T>;
    abstract getAll(): Observable<T[]>;
    abstract deleteById(id: number): Observable<any>;
    abstract update(arg: T): Observable<T>;
}
