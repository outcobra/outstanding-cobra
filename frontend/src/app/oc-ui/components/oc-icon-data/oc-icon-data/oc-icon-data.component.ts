import { Component, ContentChild, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { OCIconDataChildComponent } from '../oc-icon-data-child/oc-icon-data-child.component';
import { isTruthy } from '../../../../core/util/helper';

@Component({
    selector: 'oc-icon-data',
    templateUrl: './oc-icon-data.component.html',
    styleUrls: ['./oc-icon-data.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class OCIconDataComponent {
    @Input() public iconName: string;
    @Input() public titleKey: string;
    @HostBinding('class.show-divider')
    @Input() public showDivider: boolean = true;
    @ContentChild(OCIconDataChildComponent, { static: false }) child: OCIconDataChildComponent;

    public hasChild() {
        return isTruthy(this.child);
    }
}
