import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { FormError } from '@shared/models/forms.interfaces';

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

  constructor(private translateService: TranslateService) {}

  setValidationErrors(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.setValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (
          abstractControl
          && !abstractControl.valid
          && (abstractControl.touched || abstractControl.dirty)
        ) {
          const errorMessage = this.translateService.instant(key);
          Object.keys(abstractControl.errors!).forEach((error: string) => {
            this.formErrors[key] = this.formErrors[key].concat(
              errorMessage[error],
            );
          });
        }
      }
    });
  }

  /* eslint-disable class-methods-use-this */
  checkValidation(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (
      control: AbstractControl,
    ): { [key: string]: ValidationErrors } | null => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }
}
