import {Component, Input} from '@angular/core';
import {MarkDto} from '../model/MarkDto';

@Component({
    selector: 'mark-value',
    templateUrl: './mark-value.component.html',
    styleUrls: ['./mark-value.component.scss']
})
export class MarkValueComponent {
    @Input() mark: MarkDto;

    private static readonly MARK_ICON_MAPPING: Map<string, string> = new Map()
        .set('1', 'looks_one')
        .set('2', 'looks_two')
        .set('3', 'looks_3')
        .set('4', 'looks_4')
        .set('5', 'looks_5')
        .set('6', 'looks_6');


    public getIconNameByMarkValue(value: number) {
        let first = value.toString().substr(0, 1);
        return MarkValueComponent.MARK_ICON_MAPPING.get(first);
    }

}
