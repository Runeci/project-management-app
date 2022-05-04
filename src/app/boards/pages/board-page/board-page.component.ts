import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColumnsApiService } from '@boards/services/columns-api.service';
import { Column } from '@shared/models/columns.interfaces';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { DialogUse } from '../../../app.constants';
import { BoardDialogService } from '@boards/services/board-dialog.service';
import { Board } from '@shared/models/boards.interfaces';
import { Observable, Subscription, tap } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  public columnsArr: Column[] = [];

  private boardId: Board['id'];

  private columnName: string = '';

  private dialogSubscription!: Subscription;

  constructor(
    private columnApiService: ColumnsApiService,
    private activatedRoute: ActivatedRoute,
    private dialogService: BoardDialogService,
    private dialog: MatDialog,
  ) {
  }

  public ngOnInit(): void {
    this.boardId = this.activatedRoute.snapshot.params['id'];

    this.getColumns();

    this.dialogSubscription = this.dialogService.events$.subscribe(
      (res) => this.columnName = res);
  }

  public ngOnDestroy() {
    this.dialogSubscription.unsubscribe();
  }

  private getColumns(): void {
    this.columnApiService.getColumns(this.boardId)
      .subscribe((res) => this.columnsArr = res);
  }

  public createColumn(): void {
    if (!this.columnName) {
      return;
    }
    this.columnApiService.createColumn(
      this.boardId,
      { title: this.columnName.trim(), order: this.columnsArr.length + 1 }
    ).subscribe(
      () => this.getColumns()
    );
    this.columnName = '';
  }

  public openDialog() {
    const ref = this.dialog.open(DialogComponent, { data: DialogUse.column });
    ref.afterClosed().subscribe(
      () => this.createColumn()
    );
  }

  drop(event: CdkDragDrop<Column[]>) {
    moveItemInArray(this.columnsArr, event.previousIndex, event.currentIndex);
  }
}
