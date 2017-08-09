import {Component, Input} from '@angular/core';

@Component({
    selector: 'oc-empty',
    templateUrl: './oc-empty.component.html',
    styleUrls: ['./oc-empty.component.scss']
})
export class OcEmptyComponent {
    @Input() public iconName: string = 'inbox';
    @Input() public placeholder: string = 'i18n.common.label.empty';
    @Input() public hint: string = '';
}
