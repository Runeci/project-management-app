import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BoardsApiService } from '@boards/services/boards-api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnsApiService } from '@boards/services/columns-api.service';
import { DialogUse } from '../../../app.constants';
import { Board } from '@shared/models/boards.interfaces';
import { ActivatedRoute } from '@angular/router';
import { BoardDialogService } from '@boards/services/board-dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit{
  public titleFormControl = new FormControl(
    '',
    [Validators.required, Validators.maxLength(25),
    ],
  );

  private boardId: Board['id'] = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private boardsApiService: BoardsApiService,
    private columnsApiService: ColumnsApiService,
    private dialogService: BoardDialogService,
    @Inject(MAT_DIALOG_DATA) public name: DialogUse,
  ) {
  }

  public ngOnInit() {
    this.boardId = this.activatedRoute.snapshot.params['id'];
  }

  public onSubmit(): void {
    if (this.name === DialogUse.board) {
      this.boardsApiService.createBoard(this.titleFormControl.value)
        .subscribe();
    }

    if (this.name === DialogUse.column) {
     this.dialogService.newEvent(this.titleFormControl.value);
    }
  }
}
