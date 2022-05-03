import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { NewBoardDialogComponent } from '@boards/components/new-board-dialog/new-board-dialog.component';
import { BoardDialogService } from '@boards/services/board-dialog.service';

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
}
