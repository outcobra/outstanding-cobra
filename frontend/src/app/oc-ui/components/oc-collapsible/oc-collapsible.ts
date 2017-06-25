import {
    AfterContentInit,
    Component,
    ContentChild,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';

import {animate, state, style, transition, trigger} from '@angular/animations';
import {isTruthy} from '../../../core/util/helper';

@Component({
    selector: 'oc-collapsible-header',
    template: `
        <div class="oc-collapsible-header-content">
            <ng-content></ng-content>
        </div>
        <div class="oc-collapsible-toggle" *ngIf="showToggle">
            <md-icon>expand_more</md-icon>
        </div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class OCCollapsibleHeaderComponent {
    @Output('toggle') onClick: EventEmitter<any> = new EventEmitter();
    public showToggle: boolean;

    @HostListener('click')
    click() {
        this.onClick.emit();
    };

}

@Component({
    selector: 'oc-collapsible-body',
    template: '<ng-content></ng-content>',
})
export class OCCollapsibleBodyComponent {
}

@Component({
    selector: 'oc-collapsible',
    template: `
        <ng-content select="oc-collapsible-header"></ng-content>
        <div [@ocToggle]="active" class="oc-collapsible-body">
            <ng-content></ng-content>
        </div>`,
    styleUrls: ['./oc-collapsible.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('ocToggle', [
            state('0', style({
                height: 0
            })),
            state('1', style({
                height: '*'
            })),
            transition('0 => 1', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
            transition('1 => 0', animate('225ms cubic-bezier(0.4,0.0,0.2,1)'))
        ])
    ]
})
export class OCCollapsibleComponent implements AfterContentInit, OnChanges {
    @ContentChild(OCCollapsibleHeaderComponent) public header: OCCollapsibleHeaderComponent;
    @Input() showToggle: boolean = true;
    @HostBinding('class.active')
    @Input() active: boolean = false;

    ngAfterContentInit(): void {
        this.header.onClick.subscribe(() => this.toggle());
        this.updateToggle(this.showToggle);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (isTruthy(changes) && isTruthy(changes.showToggle)) {
            this.updateToggle(changes.showToggle.currentValue);
        }
    }

    private updateToggle(show: boolean) {
        this.header.showToggle = show;
    }

    toggle() {
        this.active = !this.active;
    }

}

