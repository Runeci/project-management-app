import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private authService: AuthService,
    private toast: NgToastService,
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
        this.toast.error({
          detail: 'Error Message',
          summary: error,
          duration: 100000,
        });
      },
    );
  }
}
