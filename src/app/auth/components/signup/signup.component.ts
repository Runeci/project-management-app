import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Path } from 'src/app/app.constants';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', []),
      login: new FormControl('', []),
      password: new FormControl('', []),
    });
  }

  onSubmit(): void {
    this.authService.signUp(this.formGroup.value).subscribe(
      (response: any) => {
        this.formGroup.reset();
        this.router.navigate([Path.loginPage]);
      },
      (error: any) => {
        console.warn(error);
      }
    );
  }
}
