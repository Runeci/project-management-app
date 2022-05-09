import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BoardsApiService } from '@boards/services/boards-api.service';
import { Board } from '@shared/models/boards.interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-boards-dialog',
  templateUrl: './boards-dialog.component.html',
  styleUrls: ['./boards-dialog.component.scss'],
})
export class BoardsDialogComponent implements OnInit {
  public form = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
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
