import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Board } from '@shared/models/boards.interfaces';
import { MatDialog } from '@angular/material/dialog';

import { BoardDialogService } from '@boards/services/board-dialog.service';
import { BoardsDialogComponent } from '@boards/components/boards-dialog/boards-dialog.component';
import { BoardsApiService } from '../../services/boards-api.service';
import { DialogUse } from '../../../app.constants';
import { DialogService } from '@core/services/dialog/dialog.service';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit, OnDestroy {
  public boardsArr: Board[] = [];

  private dialogSubscription: Subscription | undefined;

  constructor(
    private boardsService: BoardsApiService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private dialogBoardService: BoardDialogService,
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
    dialogRef.afterClosed().subscribe(() => {
      this.getBoards();
    });
  }

  public deleteBoardPreview(id: string | undefined): void {
    this.dialogService.confirmDialog({
      title: 'CONFIRM.title',
      message: 'CONFIRM.message',
      param: 'CONFIRM.param',
      confirmCaption: 'CONFIRM.DELETE',
      cancelCaption: 'CONFIRM.CANCEL',
    })
      .subscribe((confirmed) => {
        if (confirmed) {
          this.boardsService.deleteBoard(id).subscribe(
            () => this.getBoards()
          );
        }
      });
  }

  private getBoards(): void {
    this.boardsService.getBoards()
      .subscribe((res) => this.boardsArr = res);
  }
}
