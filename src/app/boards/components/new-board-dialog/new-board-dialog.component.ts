import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BoardsApiService } from '../../services/boards-api.service';

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

  constructor(private boardsService: BoardsApiService) {
  }

  public onSubmit() {
    this.boardsService.createBoard(this.titleFormControl.value)
      .subscribe();
  }
}
