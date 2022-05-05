import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Board } from '@shared/models/boards.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { BoardDialogService } from '@boards/services/board-dialog.service';
import { BoardsApiService } from '../../services/boards-api.service';
import { DialogUse } from '../../../app.constants';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit, OnDestroy {
  public boardsArr$: Observable<Board[]> | undefined;

  private dialogSubscription: Subscription | undefined;

  constructor(
    private boardsService: BoardsApiService,
    private dialog: MatDialog,
    private dialogService: BoardDialogService,
  ) {
  }

  public ngOnInit(): void {
    this.updateBoards();

    this.dialogSubscription = this.dialogService.events$.subscribe(
      () => this.openDialog(),
    );
  }

  public ngOnDestroy() {
    this.dialogSubscription?.unsubscribe();
  }

  public openDialog(): void {
    const dialogRef = this.dialog
      .open(DialogComponent, { data: DialogUse.board });
    dialogRef.afterClosed().subscribe(() => {
      this.updateBoards();
    });
  }

  public deleteBoardPreview(id: string | undefined): void {
    this.boardsService.deleteBoard(id)
      .subscribe(
        () => this.updateBoards(),
      );
  }

  private updateBoards(): void {
    this.boardsService.getBoards()
      .pipe((r) => this.boardsArr$ = r);
  }
}
