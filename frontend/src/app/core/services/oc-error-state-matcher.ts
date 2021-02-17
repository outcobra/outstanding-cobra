import { ErrorStateMatcher } from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {isTruthy} from '../util/helper';

export class OCErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | any, form: FormGroupDirective | NgForm | any): boolean {
        const isSubmitted = form && form.submitted;
        if (!control) {
            return false;
        }
        return control.invalid && (control.dirty || control.touched || isTruthy(isSubmitted));
    }
}
