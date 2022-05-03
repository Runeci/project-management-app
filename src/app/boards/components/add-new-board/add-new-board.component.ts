import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-board',
  templateUrl: './add-new-board.component.html',
  styleUrls: ['./add-new-board.component.scss'],
})
export class AddNewBoardComponent {
  @Output() openD = new EventEmitter<MouseEvent>();

  constructor(public dialog: MatDialog) {}

  public openDialog(event: MouseEvent): void {
    this.openD.emit(event);
  }
}
