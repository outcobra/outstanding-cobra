import { Injectable } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { isTruthy } from '../util/helper';

@Injectable()
export class OCErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | any, form: FormGroupDirective | NgForm | any): boolean {
    const isSubmitted = form && form.submitted;
    if (!control) {
      return false;
    }
    return control.invalid && (control.dirty || control.touched || isTruthy(isSubmitted));
  }
}
