import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '@auth/services/auth.service';

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
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      login: new FormControl('', []),
      password: new FormControl('', []),
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
