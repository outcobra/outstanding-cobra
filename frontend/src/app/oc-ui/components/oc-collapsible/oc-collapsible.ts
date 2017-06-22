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
            transition('0 => 1', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
            transition('1 => 0', animate('225ms cubic-bezier(0.4,0.0,0.2,1)'))
        ])
    ]
})
export class OCCollapsibleComponent implements AfterContentInit, OnChanges {
    @ContentChild(OCCollapsibleHeaderComponent) public header: OCCollapsibleHeaderComponent;
    @ContentChild(OCCollapsibleBodyComponent) public body: OCCollapsibleBodyComponent;
    @Input() showToggle: boolean = true;

    @HostBinding('class.active') public opened: boolean = false;

    ngAfterContentInit(): void {
        this.header.onClick.subscribe(() => this.toggle());
        this.ngOnChanges(null);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.header.showToggle = this.showToggle;
    }

    toggle() {
        this.opened = !this.opened;
    }

}

