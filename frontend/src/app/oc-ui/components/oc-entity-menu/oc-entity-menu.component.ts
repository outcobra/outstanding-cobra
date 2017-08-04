import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'oc-entity-menu',
    templateUrl: './oc-entity-menu.component.html',
    encapsulation: ViewEncapsulation.Emulated
})
export class OCEntityMenuComponent {
    @Output('delete') onDelete: EventEmitter<any> = new EventEmitter();
    @Output('edit') onEdit: EventEmitter<any> = new EventEmitter();
}
