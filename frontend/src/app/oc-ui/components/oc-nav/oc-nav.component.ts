import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'oc-nav',
    templateUrl: './oc-nav.component.html',
    styleUrls: ['./oc-nav.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.oc-nav-collapsed]': 'collapsed'
    }
})
export class OCNavComponent implements OnInit {
    @Input() public collapsible: boolean = false;

    private _collapsed: boolean;

    ngOnInit() {
        this._collapsed = this.collapsible;
    }

    public toggleNavCollapse() {
        if (!this.collapsible) return;
        this._collapsed = !this._collapsed;
    }

    get collapsed(): boolean {
        return this._collapsed;
    }
}
