import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BoardDialogService } from '@boards/services/board-dialog.service';
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
    private router: Router,
    private dialogService: BoardDialogService,
    public authService: AuthService,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  public openDialog(): void {
    this.dialogService.newEvent('open add dialog');
  }

  public togglePath(path: string): void {
    this.router.navigate([path]);
  }

  public checkRoute(route: string | string[]): boolean {
    return Array.isArray(route)
      ? route.includes(this.currentRoute) : route === this.currentRoute;
  }

  togglePath(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([Path.homePage]);
  }
}
