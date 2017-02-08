import {Observable} from 'rxjs';

/**
 * Interface for services that implement simple crud functionality
 */
export interface CrudService<T> {
    /**
     * persist an entity of type T
     * @param arg
     */
    create(arg: T): Observable<T>;
    /**
     * read an entity by its id
     * @param id
     */
    readById(id: number): Observable<T>;
    /**
     * read all available entities of type T
     */
    readAll(): Observable<T[]>;
    /**
     * delete an entity by its id
     * @param id
     */
    deleteById(id: number): Observable<any>;
    /**
     * persist a detached entity of type T
     * @param arg
     */
    update(arg: T): Observable<T>;
}
