import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { Board } from '@shared/models/boards.interfaces';
import { MatDialog } from '@angular/material/dialog';

import { BoardDialogService } from '@boards/services/board-dialog.service';
import { BoardsDialogComponent } from '@boards/components/boards-dialog/boards-dialog.component';
import { DialogService } from '@core/services/dialog/dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BoardsApiService } from '../../services/boards-api.service';
import { DialogUse } from '../../../app.constants';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit, OnDestroy {
  public boardsArr: Board[] = [];

  private dialogSubscription: Subscription | undefined;

  constructor(
    private boardsApiService: BoardsApiService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private dialogBoardService: BoardDialogService,
    private spinner: NgxSpinnerService,
  ) {
  }

  public ngOnInit(): void {
    this.getBoards();

    this.dialogSubscription = this.dialogBoardService.events$.subscribe(
      () => this.openNewBoardDialog(),
    );
  }

  public ngOnDestroy() {
    this.dialogSubscription?.unsubscribe();
  }

  public openNewBoardDialog(): void {
    const dialogRef = this.dialog
      .open(BoardsDialogComponent, { data: DialogUse.board });
    dialogRef.afterClosed().subscribe((res) => {
      if (typeof res === 'undefined') {
        return;
      }
      this.boardsApiService
        .createBoard(res.title, res.description)
        .subscribe(
          () => this.getBoards()
        );
    });
  }

  public deleteBoardPreview(id: string | undefined): void {
    this.dialogService.confirmDialog({
      param: 'CONFIRM.paramBoard',
    })
      .subscribe((confirmed) => {
        if (confirmed) {
          this.boardsApiService.deleteBoard(id).subscribe(
            () => this.getBoards(),
          );
        }
      });
  }

  private getBoards(): void {
    this.spinner.show();
    this.boardsApiService.getBoards()
      .pipe(
        finalize(() => this.spinner.hide()),
      )
      .subscribe((res) => {
        this.boardsArr = res;
        this.spinner.hide();
      });
  }
}
