import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

import { FormError, ValidationMessage } from '@shared/models/forms.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  formErrors: FormError = {
    name: '',
    login: '',
    password: '',
    title: '',
    description: '',
    img: '',
  };

  constructor() {}

  setValidationErrors(group: FormGroup, messages: ValidationMessage): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.setValidationErrors(abstractControl, messages);
      } else {
        this.formErrors[key] = '';
        if (
          abstractControl &&
          !abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty)
        ) {
          const errorMessage = messages[key];
          Object.keys(abstractControl.errors!).forEach((error: string) => {
            this.formErrors[key] = this.formErrors[key].concat(errorMessage[error]);
          });
        }
      }
    });
  }

  checkValidation(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: ValidationErrors } | null => {
      if (!control.value) {
        return null;
      }
      let valid = regex.test(control.value);
      return valid ? null : error;
    };
  }
}
