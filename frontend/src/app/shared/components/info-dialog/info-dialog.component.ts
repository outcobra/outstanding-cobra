import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {Info} from '../../model/Info';

@Component({
    selector: 'app-info-dialog',
    templateUrl: './info-dialog.component.html',
    styleUrls: ['./info-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InfoDialogComponent implements OnInit {
    public info: Info;

    constructor(private dialogRef: MdDialogRef<InfoDialogComponent>) {
    }

    ngOnInit() {
    }

}
