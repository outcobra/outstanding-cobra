import {
    HostListener,
    EventEmitter,
    HostBinding,
    Component,
    ViewEncapsulation,
    ContentChild,
    AfterContentInit,
    style,
    state,
    animate,
    transition,
    trigger
} from "@angular/core";

@Component({
    selector: 'oc-collapsible-header',
    template: '<ng-content></ng-content>',
})
export class OCCollapsibleHeaderComponent {
    onClick: EventEmitter<any> = new EventEmitter();

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
            <div [@toggle]="state">
                <ng-content select="collapsible-body"></ng-content>
            </div>`,
    styleUrls: ['./collapsible.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('toggle', [
            state('inactive', style({
                height: 0
            })),
            state('active', style({
                height: '*'
            })),
            transition('inactive => active', animate('400ms ease-in')),
            transition('active => inactive', animate('400ms ease-out'))
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
    public state: string = 'inactive';

    constructor() {
    }

    toggle() {
        this.opened = !this.opened;
        this.state = this.opened ? 'active' : 'inactive';
    }

}

