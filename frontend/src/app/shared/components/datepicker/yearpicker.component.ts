import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'yearpicker',
    templateUrl: './yearpicker.component.html',
    styleUrls: [],
    encapsulation: ViewEncapsulation.None
})
export class YearpickerComponent implements OnInit {
    private opened: boolean = true;

    constructor() {
    }

    ngOnInit() {
    }

    open() {
        this.opened = !this.opened;
    }

}
