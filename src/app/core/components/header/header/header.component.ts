import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '@auth/services/auth.service';
import { Path } from 'src/app/app.constants';
import { UserProfileComponent } from '@core/components/user-profile/user-profile.component';
import { NewBoardDialogComponent } from '@boards/components/new-board-dialog/new-board-dialog.component';
import { UserApiService } from '@core/services/user/user-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public currentRoute: string = '';

  slideValue: boolean = false;

  lang!: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private translateService: TranslateService,
    public authService: AuthService,
    public userService: UserApiService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnInit(): void {}

  public openDialog(): void {
    this.dialog.open(NewBoardDialogComponent);
  }

  public editProfile(): void {
    this.dialog.open(UserProfileComponent, {
      width: '30%',
      height: '70%',
      data: this.userService.currentUser,
    });
  }

  togglePath(path: string): void {
    this.router.navigate([path]);
  }

  changeLang(value: boolean): void {
    if (value) {
      this.lang = 'en';
    } else this.lang = 'ru';
    this.translateService.use(this.lang);
  }

  logout(): void {
    this.authService.logout();
    this.userService.logout();
    this.router.navigate([Path.homePage]);
  }
}
