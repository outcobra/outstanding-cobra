import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ManageDialog} from "../manage-dialog";
import {SchoolYearDto, SchoolClassDto} from "../model/ManageDto";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MdDialogRef} from "@angular/material";
import {OutcobraValidators} from "../../shared/services/outcobra-validators";

@Component({
    selector: 'school-year-dialog',
    templateUrl: './school-year-dialog.component.html',
    styleUrls: ['school-year-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SchoolYearDialog extends ManageDialog<SchoolYearDto, SchoolClassDto> implements OnInit {

    private schoolYearForm: FormGroup;

    constructor(public dialogRef: MdDialogRef<SchoolYearDialog>, private formBuilder: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.schoolYearForm = this.formBuilder.group({
                name: [this.isEditMode() ? this.params.name : '', Validators.required],
                validFrom: [this.isEditMode() ? this.params.validFrom : '', Validators.required],
                validTo: [this.isEditMode() ? this.params.validTo : '', Validators.required]
            },
            {
                validator: OutcobraValidators.dateFromIsBeforeDateTo
            }
        );
    }

    onSubmit() {
        if (this.schoolYearForm.valid && this.schoolYearForm.dirty) {
            this.dialogRef.close(this.schoolYearForm.value);
        }
        else if (this.schoolYearForm.pristine) {
            this.schoolYearForm.markAsDirty();
        }
    }

}
