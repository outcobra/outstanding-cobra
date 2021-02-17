import { CreateUpdateComponent } from './create-update-component';
import { ViewMode } from './view-mode';

export class ParentLinkedCreateUpdateComponent<T, E> extends CreateUpdateComponent<T> {
  private _parent: E;

  constructor(mode?: ViewMode, param?: T, parent?: E) {
    super(mode, param);
    this._parent = parent;
  }

  public initWithParent(mode: ViewMode, parent: E, param?: T): void {
    super.init(mode, param);
    this._parent = parent;
  }

  get parent(): E {
    return this._parent;
  }
}
