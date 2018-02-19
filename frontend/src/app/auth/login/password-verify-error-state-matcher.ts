import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';

export class PasswordVerifyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        if (control.invalid && control.dirty) {
            return true;
        }
        return control.parent.hasError('equals') && control.dirty;
    }
}
