import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      login: new FormControl('', []),
      password: new FormControl('', []),
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe();
    }
  }
}
