import {Component, ContentChild, HostBinding, Input, OnInit, QueryList, ViewEncapsulation} from '@angular/core';
import {IconDataChildComponent} from '../icon-data-child/icon-data-child.component';

@Component({
    selector: 'icon-data',
    templateUrl: './icon-data.component.html',
    styleUrls: ['./icon-data.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class IconDataComponent implements OnInit {
    @Input() iconName: string;
    @Input() titleKey: string;
    @HostBinding('class.show-divider')
    @Input() showDivider: boolean = true;

    @ContentChild(IconDataChildComponent) children: QueryList<IconDataChildComponent>;

    constructor() {
    }

    ngOnInit() {

    }

    hasMultipleChildren(): boolean {
        return this.children.length > 0;
    }

}
