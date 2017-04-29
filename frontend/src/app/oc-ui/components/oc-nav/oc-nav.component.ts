import {animate, Component, Input, OnInit, state, style, transition, trigger, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'oc-nav',
    templateUrl: './oc-nav.component.html',
    styleUrls: ['./oc-nav.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.oc-nav-collapsed]': 'collapsed'
    },
    animations: [
        trigger('collapsed', [
            state('true', style({
                width: '0'
            })),
            state('false', style({
                width: '*'
            })),
            transition('1 => 0', animate('300ms ease-in')),
            transition('0 => 1', animate('300ms ease-out'))
        ])
    ]
})
export class OCNavComponent implements OnInit {
    @Input() public collapsible: boolean = false;

    private _collapsed: boolean;

    constructor() {
    }

    ngOnInit() {
        this._collapsed = this.collapsible;
    }

    public toggleNavCollapse() {
        this._collapsed = !this._collapsed;
    }


    get collapsed(): boolean {
        return this._collapsed;
    }
}
