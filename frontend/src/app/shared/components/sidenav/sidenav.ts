import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'sidenav-layout',
    templateUrl: './sidenav.html',
    styleUrls: ['./sidenav.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SidenavLayout {

}

@Component({
    selector: 'sidenav',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit {

    @Input() private width: number;

    constructor() {
    }

    ngOnInit() {
        this.width = (this.width || 300);
    }

}
