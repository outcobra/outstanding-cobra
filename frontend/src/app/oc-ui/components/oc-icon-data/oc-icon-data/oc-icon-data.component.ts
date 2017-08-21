import {Component, HostBinding, Input} from '@angular/core';

@Component({
    selector: 'oc-icon-data',
    templateUrl: './oc-icon-data.component.html',
    styleUrls: ['./oc-icon-data.component.scss']
})
export class OCIconDataComponent {
    @Input() public iconName: string;
    @Input() public titleKey: string;
    @HostBinding('class.show-divider')
    @Input() public showDivider: boolean = true;
}
