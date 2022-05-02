import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NewBoardDialogComponent } from '@boards/components/new-board-dialog/new-board-dialog.component';

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

  togglePath(path: string) {
    this.router.navigate([path]);
  }
}
