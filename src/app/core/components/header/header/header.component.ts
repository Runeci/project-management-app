import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(
    public dialog: MatDialog,
    private router: Router,
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

  logout(): void {
    this.authService.logout();
    this.router.navigate([Path.homePage]);
  }
}
