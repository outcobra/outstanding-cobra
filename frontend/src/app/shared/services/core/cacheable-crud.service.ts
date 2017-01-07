import {CrudService} from "./crud.service";
import {Observable} from "rxjs";
import {CacheableService} from "./cacheable.service";

export abstract class CacheableCrudService<BasicType, CacheType> extends CacheableService<CacheType> implements CrudService<BasicType>{
    abstract create(arg: BasicType): Observable<BasicType>;
    abstract getById(id: number): Observable<BasicType>;
    abstract getAll(): Observable<BasicType[]>;
    abstract deleteById(id: number): Observable<any>;
    abstract update(arg: BasicType): Observable<BasicType>;
}
