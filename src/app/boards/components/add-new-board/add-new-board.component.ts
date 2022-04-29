import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewBoardDialogComponent } from '../new-board-dialog/new-board-dialog.component';

@Component({
  selector: 'app-add-new-board',
  templateUrl: './add-new-board.component.html',
  styleUrls: ['./add-new-board.component.scss'],
})
export class AddNewBoardComponent {
  constructor(public dialog: MatDialog) {}

  public openDialog(): void {
    const dialogRef = this.dialog.open(NewBoardDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
