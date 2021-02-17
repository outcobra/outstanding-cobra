import { Observable } from 'rxjs';
import { CacheableService } from './cacheable.service';
import { CrudService } from './crud.service';

/**
 * Used for services which have entities that can be cached and need crud functionality at the same time
 */
export abstract class CacheableCrudService<BasicType, CacheType> extends CacheableService<CacheType> implements CrudService<BasicType> {
  public create(arg: BasicType): Observable<BasicType> {
    this.clearCache();
    return this._http.put<BasicType>(this._baseUri, arg);
  }

  public readById(id: number): Observable<BasicType> {
    return this._http.get<BasicType>(`${this._baseUri}/${id}`);
  }

  public readAll(): Observable<BasicType[]> {
    return this._http.get<BasicType[]>(this._baseUri);
  }

  public deleteById(id: number): Observable<any> {
    this.clearCache();
    return this._http.delete<any>(`${this._baseUri}/${id}`);
  }

  public update(arg: BasicType): Observable<BasicType> {
    this.clearCache();
    return this._http.post<BasicType>(this._baseUri, arg);
  }
}
