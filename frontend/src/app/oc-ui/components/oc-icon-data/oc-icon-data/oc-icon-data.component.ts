import {Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'oc-icon-data',
    templateUrl: './oc-icon-data.component.html',
    styleUrls: ['./oc-icon-data.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OCIconDataComponent {
    @Input() iconName: string;
    @Input() titleKey: string;
    @HostBinding('class.show-divider')
    @Input() showDivider: boolean = true;
}
