import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from '@auth/services/auth.service';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  formGroup!: FormGroup;

  message: string | undefined;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', []),
      login: new FormControl('', []),
      password: new FormControl('', []),
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
}
