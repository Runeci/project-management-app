import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@auth/services/auth.service';
import { UserApiService } from '@core/services/user/user-api.service';
import { UserInfo } from '@shared/models/user.interfaces';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    public userServise: UserApiService,
    public authService: AuthService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public user: UserInfo
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', []),
      login: new FormControl('', []),
      password: new FormControl('', []),
    });
  }

  onSubmit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
