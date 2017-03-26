import {Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'icon-data',
    templateUrl: './icon-data.component.html',
    styleUrls: ['./icon-data.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class IconDataComponent {
    @Input() iconName: string;
    @Input() titleKey: string;
    @HostBinding('class.show-divider')
    @Input() showDivider: boolean = true;
}
