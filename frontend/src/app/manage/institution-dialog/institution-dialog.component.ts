import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {MdDialogRef} from "@angular/material";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'institution-dialog',
    templateUrl: './institution-dialog.component.html',
    styleUrls: ['./institution-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InstitutionDialog implements OnInit {

    constructor(public dialogRef: MdDialogRef<InstitutionDialog>, private fb: FormBuilder) {
    }

    private institutionForm: FormGroup;

    ngOnInit() {
        this.institutionForm = this.fb.group({
            institutionName: ''
        });
    }

    onSubmit() {
        if (this.institutionForm.valid) {
            let institutionName = this.institutionForm.value.institutionName;
            this.dialogRef.close({institutionName: institutionName});
        }
    }

}
