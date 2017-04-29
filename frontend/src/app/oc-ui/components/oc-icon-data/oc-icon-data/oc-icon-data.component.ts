import {Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'oc-icon-data',
    templateUrl: './oc-icon-data.component.html',
    styleUrls: ['./oc-icon-data.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OCIconDataComponent {
    @Input() public iconName: string;
    @Input() publictitleKey: string;
    @HostBinding('class.show-divider')
    @Input() public showDivider: boolean = true;
}
