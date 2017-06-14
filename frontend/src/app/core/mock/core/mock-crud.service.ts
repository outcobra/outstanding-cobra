import {Observable} from 'rxjs/Observable';
import {isNotNull} from '../../util/helper';
import {Util} from '../../util/util';
import {AppCrudService} from '../../services/core/app-crud.service';
import {Dto} from '../../common/dto';

export class MockCrudService<T extends Dto> extends AppCrudService<T> {
    _http;
    private _items: T[];
    private _currentId: number;

    constructor(initItems: T[] = []) {
        super(null, '');
        this._items = [];
        initItems.map(item => this._createItem(item));
        this._currentId = 1;
    }

    private _createItem(arg: T): T {
        arg.id = this._currentId++;
        this._items.push(arg);
        return arg;
    }

    private _exists(id: number) {
        return isNotNull(this._items.find(item => item.id === id));
    }

    create(arg: T): Observable<T> {
        return Observable.of(this._createItem(arg));
    }

    readById(id: number): Observable<T> {
        return Observable.of(
            this._items.find(item => item.id === id)
        );
    }

    readAll(): Observable<T[]> {
        return Observable.of(this._items);
    }

    deleteById(id: number): Observable<any> {
        Util.arrayRemove(this._items, item => item.id === id);
        return Observable.empty();
    }

    update(arg: T): Observable<T> {
        this.deleteById(arg.id);
        return this.create(arg);
    }

}
