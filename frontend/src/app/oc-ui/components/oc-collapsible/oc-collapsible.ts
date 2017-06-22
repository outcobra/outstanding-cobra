import {
    AfterContentInit,
    Component,
    ContentChild,
    EventEmitter,
    HostBinding,
    HostListener, Output,
    ViewEncapsulation
} from '@angular/core';

import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'oc-collapsible-header',
    template: '<ng-content></ng-content>',
})
export class OCCollapsibleHeaderComponent {
    @Output('toggle') onClick: EventEmitter<any> = new EventEmitter();

    @HostListener('click') click() {
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
            <ng-content></ng-content>
            <div [@ocToggle]="opened">
                <ng-content select="oc-collapsible-body"></ng-content>
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
            transition('0 => 1', animate('400ms ease-in')),
            transition('1 => 0', animate('400ms ease-out'))
        ])
    ]
})
export class OCCollapsibleComponent implements AfterContentInit {
    @ContentChild(OCCollapsibleHeaderComponent) public header: OCCollapsibleHeaderComponent;
    @ContentChild(OCCollapsibleBodyComponent) public body: OCCollapsibleBodyComponent;

    ngAfterContentInit(): void {
        this.header.onClick.subscribe(() => {
            this.toggle();
        });
    }

    @HostBinding('class.active') public opened: boolean = false;

    toggle() {
        this.opened = !this.opened;
    }

}

