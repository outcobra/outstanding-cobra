import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MarkDto} from '../model/mark.dto';
import {OCEntityMenuComponent} from '../../oc-ui/components/oc-entity-menu/oc-entity-menu.component';

@Component({
    selector: 'mark-value',
    templateUrl: './mark-value.component.html',
    styleUrls: ['./mark-value.component.scss']
})
export class MarkValueComponent implements OnInit, OnChanges {
    @Input() mark: MarkDto;
    @Input() editEnabled: boolean;
    @ViewChild(OCEntityMenuComponent) entityMenu: OCEntityMenuComponent;

    @Output('edit') public onEdit: EventEmitter<any> = new EventEmitter();
    @Output('delete') public onDelete: EventEmitter<any> = new EventEmitter();

    private static readonly MARK_ICON_MAPPING: Map<string, string> = new Map()
        .set('0', 'filter_none')
        .set('1', 'looks_one')
        .set('2', 'looks_two')
        .set('3', 'looks_3')
        .set('4', 'looks_4')
        .set('5', 'looks_5')
        .set('6', 'looks_6');

    ngOnInit() {
        if (this.entityMenu) {
            this.entityMenu.onEdit.subscribe(() => this.onEdit.emit());
            this.entityMenu.onDelete.subscribe(() => this.onDelete.emit());
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['editEnabled']) {
            this.ngOnInit();
        }
    }

    public getIconNameByMarkValue(value: number) {
        let first = value.toString().substr(0, 1);
        return MarkValueComponent.MARK_ICON_MAPPING.get(first);
    }

}
