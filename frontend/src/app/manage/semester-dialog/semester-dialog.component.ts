import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {MdDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators, AbstractControl} from "@angular/forms";
import {ManageDialog} from "../manage-dialog";
import {SemesterDto, SchoolYearDto} from "../model/ManageDto";
import {OutcobraValidators} from "../../shared/services/outcobra-validators";
import {TranslateService} from "ng2-translate";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'semester-dialog',
    templateUrl: './semester-dialog.component.html',
    styleUrls: ['./semester-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SemesterDialog extends ManageDialog<SemesterDto, SchoolYearDto> implements OnInit {

    constructor(public dialogRef: MdDialogRef<SemesterDialog>,
                private formBuilder: FormBuilder,
                private translate: TranslateService,
                private datePipe: DatePipe) {
        super();
    }

    private semesterForm: FormGroup;

    ngOnInit() {
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

    getErrorText(controlName: string, errorName: string, errorProp: string) {
        let control = this.semesterForm.get(controlName);
        let date = this.datePipe.transform(control.getError(errorName)[errorProp], 'MM.dd.y');
        return control.hasError(errorName) ? this.translate.instant(`i18n.common.form.error.${errorName}`, {'date': date}) : "";
    }

    onCancel() {
        this.dialogRef.close(null);
    }

    onSubmit() {
        if (this.semesterForm.valid && this.semesterForm.dirty) {
            let value = this.semesterForm.value;
            value.schoolYearId = this.parent.id;
            this.dialogRef.close(value);
        }
        else if (this.semesterForm.pristine) {
            this.revalidateForm(this.semesterForm);
        }
    }

}
