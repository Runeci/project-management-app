import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BoardsApiService } from '@boards/services/boards-api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnsApiService } from '@boards/services/columns-api.service';
import { Board } from '@shared/models/boards.interfaces';
import { ActivatedRoute } from '@angular/router';
import { BoardDialogService } from '@boards/services/board-dialog.service';
import { DialogUse } from '../../../app.constants';

@Component({
  selector: 'app-boards-dialog',
  templateUrl: './boards-dialog.component.html',
  styleUrls: ['./boards-dialog.component.scss'],
})
export class BoardsDialogComponent implements OnInit {
  public form = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

  private boardId: Board['id'] = '';

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private boardsApiService: BoardsApiService,
  ) {
  }

  public ngOnInit() {
    this.boardId = this.activatedRoute.snapshot.params['id'];
  }

  public onSubmit(): void {
    this.boardsApiService
      .createBoard(this.form.value.title, this.form.value.description)
      .subscribe();
  }
}
