import {Component, ViewEncapsulation, Output, EventEmitter} from "@angular/core";

@Component({
    selector: 'entity-menu',
    templateUrl: './entity-menu.component.html',
    styleUrls: ['./entity-menu.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class EntityMenuComponent {
    @Output('delete') onDelete: EventEmitter<any> = new EventEmitter();
    @Output('edit') onEdit: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    clickedEdit() {
        this.onEdit.emit();
    }

    clickedDelete() {
        this.onDelete.emit();
    }

}
