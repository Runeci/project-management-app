import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

import { AuthService } from '@auth/services/auth.service';
import { ValidationService } from '@core/services/validation/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private authService: AuthService,
    private toast: NgToastService,
    public validationService: ValidationService
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe(
        () => {
          this.formGroup.reset();
        },
        (error) => {
          this.toast.error({
            detail: 'Error Message',
            summary: error,
            duration: 10000,
          });
        },
      );
    }
  }
}
