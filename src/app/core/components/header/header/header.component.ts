import {
 Component, HostListener, OnInit,
} from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '@auth/services/auth.service';
import { BoardDialogService } from '@boards/services/board-dialog.service';
import { Path } from 'src/app/app.constants';
import { UserApiService } from '@core/services/user/user-api.service';
import { UserProfileComponent } from '@core/components/user-profile/user-profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @HostListener('window:resize', ['$event']) onResize() {
    this.innerWidth = window.innerWidth;
    this.isSmall = this.innerWidth < 600;
  }

  public isSmall: boolean | undefined;

  public innerWidth: number | undefined;

  public currentRoute: string = '';

  slideValue: boolean = false;

  lang!: string;

  constructor(
    private router: Router,
    private dialogService: BoardDialogService,
    private translateService: TranslateService,
    public authService: AuthService,
    public userService: UserApiService,
    public dialog: MatDialog,
  ) {
  }

  public ngOnInit() {
    this.innerWidth = window.innerWidth;

    this.isSmall = this.innerWidth < 600;

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  public openDialog(): void {
    this.dialogService.newEvent('open add boards-dialog');
  }

  public editProfile(): void {
    this.dialog
      .open(UserProfileComponent, {
        width: '300px',
        data: this.userService.currentUser,
      })
      .afterClosed();
  }

  togglePath(path: string): void {
    this.router.navigate([path]);
  }

  public checkRoute(route: string): boolean {
    return this.currentRoute.includes(route);
  }

  changeLang(value: boolean): void {
    if (value) {
      this.lang = 'en';
    } else {
      this.lang = 'ru';
    }
    this.translateService.use(this.lang);
  }

  logout(): void {
    this.authService.logout();
    this.userService.logout();
    this.router.navigate([Path.homePage]);
  }
}
