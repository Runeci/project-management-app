import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthService } from '@auth/services/auth.service';
import { UserApiService } from '@core/services/user/user-api.service';
import { UserInfo } from '@shared/models/user.interfaces';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(
    public userService: UserApiService,
    public authService: AuthService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public user: UserInfo
  ) {}

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      name: new FormControl('', []),
      login: new FormControl('', []),
      password: new FormControl('', []),
    });

    if (this.user) {
      this.profileForm.controls['name'].setValue(this.user.name);
      this.profileForm.controls['login'].setValue(this.user.login);
      this.profileForm.controls['password'].setValue(this.user.id);
    }
  }

  onSubmit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateUser() {
    this.userService
      .updateUser(this.user.id, this.profileForm.value)
      .subscribe({
        next: (res) => {
          alert(`Success ${res}`);
          this.dialogRef.close('update')
        },
        error:(err) => {
          alert('error')
        }
      });
  }
}
