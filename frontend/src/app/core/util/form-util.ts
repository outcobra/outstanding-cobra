import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {eq} from './helper';

export class FormUtil {
    public static removeControlInArray(formArray: FormArray, toRemove: FormControl) {
        let idx = FormUtil.getIndexOfFormControl(formArray, toRemove);
        formArray.removeAt(idx);
    }

    public static getIndexOfFormControl(formArray: FormArray, toSearch: FormControl) {
        return formArray.controls.findIndex(eq(toSearch));
    }

    /**
     * marks invalid fields in the FormGroup as touched and returns the validity of the FormGroup
     * used for validation on submit
     *
     * @param form FormGroup
     * @return validity of the given FormGroup
     */
    public static revalidateForm(form: FormGroup): boolean {
        Object.keys(form.controls).forEach((key) => {
            let control: AbstractControl = form.controls[key];
            if (control instanceof FormGroup) {
                this.revalidateForm(control);
            } else {
                this.revalidateControl(control);
            }
        });
        return form.valid;
    }

    /**
     * recalculates the validity of the given control and marks it as touched if invalid
     *
     * @param control AbstractControl to be checked
     * @return {boolean} the validity of the control
     */
    public static revalidateControl(control: AbstractControl): boolean {
        control.updateValueAndValidity({onlySelf: true});
        if (control.invalid) {
            control.markAsTouched();
        }
        return control.valid;
    }
}
