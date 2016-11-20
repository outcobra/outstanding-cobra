import {Component, OnInit} from "@angular/core";
import {MdDialogRef} from "@angular/material";

@Component({
    selector: 'institution-dialog',
    templateUrl: './institution-dialog.component.html',
    styleUrls: ['./institution-dialog.component.scss']
})
export class InstitutionDialog implements OnInit {

    constructor(public dialogRef: MdDialogRef<InstitutionDialog>) {
    }

    ngOnInit() {
    }

}
