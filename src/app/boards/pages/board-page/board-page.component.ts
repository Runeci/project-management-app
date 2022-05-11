import { Component, OnInit } from '@angular/core';
import { ColumnsApiService } from '@boards/services/columns-api.service';
import { Column } from '@shared/models/columns.interfaces';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BoardDialogService } from '@boards/services/board-dialog.service';
import { Board } from '@shared/models/boards.interfaces';
import {
  forkJoin, Subscription, switchMap, take,
} from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NewColumnDialogComponent } from '@boards/components/new-column-dialog/new-column-dialog.component';
import { DialogService } from '@core/services/dialog/dialog.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  private boardId: Board['id'];

  public columnsArray: Column[] = [];

  constructor(
    private columnApiService: ColumnsApiService,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private dialog: MatDialog,
  ) {
  }

  public ngOnInit(): void {
    this.boardId = this.activatedRoute.snapshot.params['id'];

    this.getColumns();
  }

  public openConfirmationModal(columnInfo: Pick<Column, 'order' | 'id'>) {
    this.dialogService.confirmDialog({
      title: 'CONFIRM.title',
      message: 'CONFIRM.message',
      param: 'CONFIRM.param',
      confirmCaption: 'CONFIRM.DELETE',
      cancelCaption: 'CONFIRM.CANCEL',
    })
      .subscribe((confirmed) => {
        if (confirmed) {
          this.deleteColumn(columnInfo);
        }
      });
  }

  private deleteColumn(columnInfo: Pick<Column, 'order' | 'id'>) {
    const start = columnInfo.order - 1;
    this.columnApiService.deleteColumn(this.boardId, columnInfo.id).subscribe(
      () => {
        this.columnsArray.splice(start, 1);

        this.columnsArray = this.columnsArray.map((column, index) => ({
          id: column.id,
          title: column.title,
          order: index + 1,
          tasks: column.tasks,
        }));

        this.updateColumnsOrder();
      },
    );
  }

  private updateColumnsOrder() {
    this.columnsArray.forEach((column) => {
      this.columnApiService.updateColumn(
        this.boardId,
        column.id,
        {
          title: column.title,
          order: column.order,
        },
      )
        .pipe(
          take(1),
        )
        .subscribe();
    });
  }

  public openNewColumnDialog() {
    const ref = this.dialog.open(NewColumnDialogComponent);

    ref.afterClosed().subscribe((result) => {
      if (typeof result === 'undefined') {
        return
      }
      this.columnApiService.createColumn(this.boardId, {
        title: result.columnTitle,
        order: this.columnsArray.length + 1,
      }).subscribe(
        (column) => {
          column.tasks = [];
          this.columnsArray.push(column);
        },
      );

    });
  }

  public dropGroup(event: CdkDragDrop<Column[], any>) {
    moveItemInArray(this.columnsArray, event.previousIndex, event.currentIndex);

    this.columnsArray = this.columnsArray.map((column, index) => ({
      id: column.id,
      order: index + 1,
      tasks: column.tasks,
      title: column.title,
    }));
    //
    // this.columnsArray.forEach((column) => {
    //   this.columnApiService.updateColumn(this.boardId, column.id,
    //     { title: column.title, order: column.order }
    //   ).pipe(
    //     delay(10)
    //   ).subscribe();
    // });
  }

  public getConnectedList(): any[] {
    return this.columnsArray.map((x: { order: any; }) => `${ x.order }`);
  }

  private getColumns(): void {
    this.columnApiService.getColumns(this.boardId)
      .pipe(
        switchMap((columns) => forkJoin(
          columns.map((col) => this.columnApiService.getColumn(this.boardId, col.id)),
        )),
      )
      .subscribe((res) => {
        this.columnsArray = res.sort((prev, next) => prev.order - next.order);
      });
  }
}
