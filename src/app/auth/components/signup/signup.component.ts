import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { ValidationService } from '@core/services/validation.service';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;

  private ngUnsubscribe = new Subject();

  constructor(
    private authService: AuthService,
    public validationService: ValidationService,
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      login: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        this.validationService.checkValidation(/[0-9]/, { hasNumber: true }),
        this.validationService.checkValidation(/[A-Z]/, {
          hasCapitalCase: true,
        }),
        this.validationService.checkValidation(/[a-z]/, { hasSmallCase: true }),
        /* eslint-disable no-useless-escape */
        this.validationService.checkValidation(
          /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
          {
            hasSpecialCharacters: true,
          },
        ),
      ]),
    });
    this.formGroup.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.validationService.setValidationErrors(this.formGroup);
      });
  }

  onSubmit(): void {
    this.authService.signUp(this.formGroup.value).subscribe(() => {
      this.formGroup.reset();
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next('');
    this.ngUnsubscribe.complete();
  }
}
