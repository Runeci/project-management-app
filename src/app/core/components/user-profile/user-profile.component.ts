import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthService } from '@auth/services/auth.service';
import { DialogService } from '@core/services/dialog/dialog.service';
import { LocalStorageService } from '@core/services/localstorage.service';
import { NotificationService } from '@core/services/notification.service';
import { UserApiService } from '@core/services/user/user-api.service';
import { UserInfo } from '@shared/models/user.interfaces';
import { StorageKeys } from 'src/app/app.constants';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(
    private userService: UserApiService,
    private authService: AuthService,
    private dialog: DialogService,
    private notificationService: NotificationService,
    private storageService: LocalStorageService,
    private dialogRef: MatDialogRef<UserProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public user: UserInfo
  ) {}

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      name: new FormControl('', []),
      login: new FormControl('', []),
      password: new FormControl('', []),
    });
    this.setUserFormData();
  }

  setUserFormData() {
    if (this.user) {
      this.profileForm.controls['name'].setValue(this.user.name);
      this.profileForm.controls['login'].setValue(this.user.login);
    }
  }

  updateUser() {
    this.userService.updateUser(this.user.id, this.profileForm.value).subscribe(
      (user: UserInfo) => {
        this.storageService.setStorageData(user, StorageKeys.user);
        this.notificationService.createToastSuccess('Profile updated');
      },
      (error) => {
        this.notificationService.translateToast(error, 'error');
      }
    );
  }

  cancelUpdate() {
    this.setUserFormData()
  }

  openConfirmDialog() {
    this.dialog
      .confirmDialog({
        title: 'Are you sure?',
        message: 'Do you want to delete profile?',
        confirmCaption: 'Delete',
        cancelCaption: 'Cancel',
      })
      .subscribe((confirmed) => {
        if (confirmed) {
          this.userService.deleteUser(this.user.id).subscribe(
            () => {
              this.notificationService.createToastSuccess('Profile deleted');
            },
            (error) => {
              this.notificationService.translateToast(error, 'error');
            }
          );
          this.authService.logout();
          this.userService.logout();
          this.dialogRef.close();
        }
      });
  }
}
