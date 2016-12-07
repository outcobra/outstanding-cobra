import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {MdDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ManageDialog} from "../manage-dialog";
import {SemesterDto, SchoolYearDto} from "../model/ManageDto";
import {OutcobraValidators} from "../../shared/services/outcobra-validators";

@Component({
    selector: 'semester-dialog',
    templateUrl: 'semester-dialog.component.html',
    styleUrls: ['semester-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SemesterDialog extends ManageDialog<SemesterDto, SchoolYearDto> implements OnInit {

    constructor(public dialogRef: MdDialogRef<SemesterDialog>, private formBuilder: FormBuilder) {
        super();
    }

    private semesterForm: FormGroup;

    ngOnInit() {
        console.log(this.parent);
        this.semesterForm = this.formBuilder.group({
                name: [this.isEditMode() ? this.params.name : '', Validators.required],
                validFrom: [this.isEditMode() ? this.params.validFrom : '', Validators.compose([Validators.required, OutcobraValidators.isAfterOrEqualDay(this.parent.validFrom)])],
                validTo: [this.isEditMode() ? this.params.validTo : '', Validators.compose([Validators.required, OutcobraValidators.isBeforeOrEqualDay(this.parent.validTo)])]
            },
            {
                validator: OutcobraValidators.dateFromIsBeforeDateTo
            }
        );
    }

    onCancel() {
        this.dialogRef.close(null);
    }

    onSubmit() {
        if (this.semesterForm.valid && this.semesterForm.dirty) {
            this.dialogRef.close(this.semesterForm.value);
        }
        else if (this.semesterForm.pristine) {
            this.revalidateForm(this.semesterForm);
        }
    }

}
