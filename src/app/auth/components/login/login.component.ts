import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  errorMessage: string | undefined = undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      login: new FormControl('', []),
      password: new FormControl('', []),
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe(
        ({token}) => {
          this.authService.getUser(token).subscribe((res) => console.log(res))
          this.formGroup.reset();
        },
        (error) => {
          this.errorMessage = error;
        },
      );
    }
  }
}
