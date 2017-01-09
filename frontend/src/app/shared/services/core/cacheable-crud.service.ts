import {CrudService} from "./crud.service";
import {Observable} from "rxjs";
import {CacheableService} from "./cacheable.service";

/**
 * Used for services which have entities that can be cached and need crud functionality at the same time
 */
export abstract class CacheableCrudService<BasicType, CacheType> extends CacheableService<CacheType> implements CrudService<BasicType>{
    create(arg: BasicType): Observable<BasicType> {
        this.clearCache();
        return this.http.put<BasicType>(this.baseUri, arg);
    }
    readById(id: number): Observable<BasicType> {
        return this.http.get<BasicType>(`${this.baseUri}/${id}`);
    }
    readAll(): Observable<BasicType[]> {
        return this.http.get<BasicType[]>(this.baseUri);
    }
    deleteById(id: number): Observable<any> {
        this.clearCache();
        return this.http.delete<any>(`${this.baseUri}/${id}`);
    }
    update(arg: BasicType): Observable<BasicType> {
        this.clearCache();
        return this.http.post<BasicType>(this.baseUri, arg);
    }
}
