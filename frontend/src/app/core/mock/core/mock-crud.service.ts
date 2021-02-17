import { EMPTY, Observable, of as observableOf } from 'rxjs';
import { Dto } from '../../common/dto';
import { AppCrudService } from '../../services/core/app-crud.service';
import { isNotNull } from '../../util/helper';
import { Util } from '../../util/util';

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
    return observableOf(this._createItem(arg));
  }

  readById(id: number): Observable<T> {
    return observableOf(
      this._items.find(item => item.id === id)
    );
  }

  readAll(): Observable<T[]> {
    return observableOf(this._items);
  }

  deleteById(id: number): Observable<any> {
    Util.removeFirstMatch(this._items, item => item.id === id);
    return EMPTY;
  }

  update(arg: T): Observable<T> {
    this.deleteById(arg.id);
    return this.create(arg);
  }

}
