import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

import { NewBoardDialogComponent } from '@boards/components/new-board-dialog/new-board-dialog.component';
import { AuthService } from '@auth/services/auth.service';
import { Path } from 'src/app/app.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public currentRoute: string = '';

  slideValue: boolean = false;

  lang!: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private translateService: TranslateService,
    public authService: AuthService,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  public openDialog(): void {
    this.dialog.open(NewBoardDialogComponent);
  }

  togglePath(path: string): void {
    this.router.navigate([path]);
  }

  changeLang(value: boolean): void {
    if (value) {
      this.lang = 'en';
    } else this.lang = 'ru';
    this.translateService.use(this.lang);

  logout(): void {
    this.authService.logout();
    this.router.navigate([Path.homePage]);
  }
}
