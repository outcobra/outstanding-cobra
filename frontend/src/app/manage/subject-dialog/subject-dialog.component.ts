import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {MdDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ManageDialog} from "../manage-dialog";
import {SemesterDto, SubjectDto} from "../model/ManageDto";
import {Response, Http} from "@angular/http";

@Component({
    selector: 'subject-dialog',
    templateUrl: './subject-dialog.component.html',
    styleUrls: ['./subject-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SubjectDialog extends ManageDialog<SubjectDto, SemesterDto> implements OnInit {

    constructor(public dialogRef: MdDialogRef<SubjectDialog>,
                private formBuilder: FormBuilder,
                private http: Http) {
        super();
    }

    private subjectForm: FormGroup;

    ngOnInit() {
        this.subjectForm = this.formBuilder.group({
                name: [this.isEditMode() ? this.params.name : '', Validators.required]
            }
        );
    }

    onCancel() {
        this.dialogRef.close(null);
    }

    onSubmit() {
        if (this.subjectForm.valid && this.subjectForm.dirty) {
            let value = this.subjectForm.value;
            value.semesterId = this.parent.id;
            this.http.get('http://www.colr.org/json/color/random')
                .map((res: Response) => res.json())
                .subscribe(res => {
                    value.color = res.new_color;
                    this.dialogRef.close(value);
            });
        }
        else if (this.subjectForm.pristine) {
            this.revalidateForm(this.subjectForm);
        }
    }

}
