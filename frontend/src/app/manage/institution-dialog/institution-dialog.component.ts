import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ParentLinkedCreateUpdateComponent } from '../../core/common/parent-linked-create-update-component';
import { FormUtil } from '../../core/util/form-util';
import { InstitutionDto } from '../model/manage.dto';
import { InstitutionService } from '../service/institution.service';

@Component({
  selector: 'institution-dialog',
  templateUrl: './institution-dialog.component.html',
  styleUrls: ['./institution-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InstitutionDialog extends ParentLinkedCreateUpdateComponent<InstitutionDto, any> implements OnInit {

  private _institutionForm: FormGroup;

  constructor(private _dialogRef: MatDialogRef<InstitutionDialog>,
              private _institutionService: InstitutionService,
              private _formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this._institutionForm = this._formBuilder.group({
      name: [this.getParamOrDefault('name'), Validators.required]
    });
  }

  public submit() {
    if (!(this._institutionForm.valid && this._institutionForm.dirty)) {
      FormUtil.revalidateForm(this._institutionForm);
    }
    if (this.isEditMode()) {
      this.param.name = this._institutionForm.get('name').value;
      this._saveAndClose(this.param);
    } else {
      let value = this._institutionForm.value as InstitutionDto;
      this._saveAndClose(value);
    }

  }

  private _saveAndClose(institution: InstitutionDto) {
    this._institutionService.save(institution)
      .subscribe(result => this._dialogRef.close(result));
  }

  get institutionForm(): FormGroup {
    return this._institutionForm;
  }
}
