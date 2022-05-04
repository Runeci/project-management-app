import {
 ChangeDetectionStrategy, Component, OnDestroy, OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { NotificationService } from '@core/services/notification.service';
import { AuthService } from '@auth/services/auth.service';
import { ValidationService } from '@core/services/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;

  private ngUnsubscribe = new Subject();

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    public validationService: ValidationService,
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    this.formGroup.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.validationService.setValidationErrors(this.formGroup);
      });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe(
        () => {
          this.formGroup.reset();
        },
        (error) => {
          this.notificationService.translateToastError(error);
        },
      );
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next('');
    this.ngUnsubscribe.complete();
  }
}
