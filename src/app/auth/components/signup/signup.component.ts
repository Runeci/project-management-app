import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

import { AuthService } from '@auth/services/auth.service';
import { NotificationService } from '@core/services/notification.service';
import { Subject, takeUntil } from 'rxjs';
import { ValidationMessage } from '@shared/models/forms.interfaces';
import DataJson from 'src/assets/data-error-message.json';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;
  errorMessages!: ValidationMessage;
  private ngUnsubscribe = new Subject();

  message: string | undefined;
  validationService: any;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {
    [this.errorMessages] = DataJson;
  }

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
          }
        ),
      ]),
    });
    this.formGroup.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.validationService.setValidationErrors(
          this.formGroup,
          this.errorMessages
        );
      });
  }

  onSubmit(): void {
    this.authService.signUp(this.formGroup.value).subscribe(
      () => {
        this.formGroup.reset();
      },
      (error) => {
        this.notificationService.translateToastError(error);
      },
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next('');
    this.ngUnsubscribe.complete();
  }
}
