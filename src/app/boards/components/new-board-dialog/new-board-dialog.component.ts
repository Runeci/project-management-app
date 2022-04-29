import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-new-board-dialog',
  templateUrl: './new-board-dialog.component.html',
  styleUrls: ['./new-board-dialog.component.scss'],
})
export class NewBoardDialogComponent {
  public titleFormControl = new FormControl(
    '',
    [Validators.required, Validators.maxLength(25),
    ],
);

  constructor(private boardsService: BoardsService) {
  }

  public onSubmit(event: Event) {
    event.preventDefault();
    this.boardsService.createBoard(this.titleFormControl.value);
  }
}
