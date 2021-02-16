import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChildren
} from '@angular/core';
import {MarkDto} from '../model/mark.dto';
import {OCEntityMenuComponent} from '../../oc-ui/components/oc-entity-menu/oc-entity-menu.component';
import {isNotEmpty} from '../../core/util/helper';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'mark-value',
    templateUrl: './mark-value.component.html',
    styleUrls: ['./mark-value.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkValueComponent implements AfterViewInit {
    @Input() editEnabled: boolean;
    @Input() mark: MarkDto;
    @Input() showDivider: boolean = true;
    @ViewChildren(OCEntityMenuComponent) entityMenus: QueryList<OCEntityMenuComponent>;

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

    ngAfterViewInit() {
        if (isNotEmpty(this.entityMenus)) {
            this._initEmitters(this.entityMenus);
        }
        this.entityMenus.changes
            .pipe(
                filter(isNotEmpty)
            )
            .subscribe(this._initEmitters);
    }

    public getIconNameByMarkValue(value: number) {
        let first = value.toString().substr(0, 1);
        return MarkValueComponent.MARK_ICON_MAPPING.get(first);
    }

    private _initEmitters(list: QueryList<OCEntityMenuComponent>) {
        list.first.onEdit.subscribe(() => this.onEdit.emit());
        list.first.onDelete.subscribe(() => this.onDelete.emit());
    }
}
