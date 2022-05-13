import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthService } from '@auth/services/auth.service';
import { DialogService } from '@core/services/dialog/dialog.service';
import { LocalStorageService } from '@core/services/localstorage.service';
import { UserApiService } from '@core/services/user/user-api.service';
import { ValidationService } from '@core/services/validation.service';
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
    public validationService: ValidationService,
    private storageService: LocalStorageService,
    private dialogRef: MatDialogRef<UserProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public user: UserInfo
  ) {}

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      name: new FormControl('', [Validators.minLength(2)]),
      login: new FormControl('', [Validators.email]),
      password: new FormControl('', [
        Validators.minLength(8),
        this.validationService.checkValidation(/[0-9]/, { hasNumber: true }),
        this.validationService.checkValidation(/[A-Z]/, {
          hasCapitalCase: true,
        }),
        this.validationService.checkValidation(/[a-z]/, { hasSmallCase: true }),
        /* eslint-disable no-useless-escape */
        this.validationService.checkValidation(
          /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
          {
            hasSpecialCharacters: true,
          }
        ),
      ]),
    });
    this.setUserFormData();
    this.profileForm.valueChanges.subscribe(() => {
      this.validationService.setValidationErrors(this.profileForm);
    });
  }

  setUserFormData() {
    if (this.user) {
      this.profileForm.controls['name'].setValue(this.user.name);
      this.profileForm.controls['login'].setValue(this.user.login);
    }
  }

  updateUser() {
    this.userService
      .updateUser(this.user.id, this.profileForm.value)
      .subscribe((user: UserInfo) => {
        this.storageService.setStorageData(user, StorageKeys.user);
      });
  }

  cancelUpdate() {
    this.setUserFormData();
  }

  openConfirmDialog() {
    this.dialog
      .confirmDialog({
        title: 'CONFIRM.title',
        message: 'CONFIRM.message',
        param: 'CONFIRM.paramProf',
        confirmCaption: 'CONFIRM.DELETE',
        cancelCaption: 'CONFIRM.CANCEL',
      })
      .subscribe((confirmed) => {
        if (confirmed) {
          this.userService.deleteUser(this.user.id).subscribe();
          this.authService.logout();
          this.userService.logout();
          this.dialogRef.close();
        }
      });
  }
}
