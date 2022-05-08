import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColumnsApiService } from '@boards/services/columns-api.service';
import { Column } from '@shared/models/columns.interfaces';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BoardDialogService } from '@boards/services/board-dialog.service';
import { Board } from '@shared/models/boards.interfaces';
import { forkJoin, Subscription, switchMap, take } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardsDialogComponent } from '@boards/components/dialog/boards-dialog.component';
import { DialogUse } from '../../../app.constants';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit{

  private boardId: Board['id'];

  private columnName: string = '';

  private dialogSubscription!: Subscription;

  public columnsArray: Column[] = [];

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
      (res) => this.columnName = res,
    );
  }

  public ngOnDestroy() {
    this.dialogSubscription.unsubscribe();
  }

  public updateColumnsAfterDelete(columnOrder: Column['order']) {
    const start = columnOrder - 1;
    this.columnsArray.splice(start, 1);
    this.updateColumnsOrder();
  }

  private updateColumnsOrder() {
    this.columnsArray.forEach((column, index) => {
      this.columnApiService.updateColumn(
        this.boardId,
        column.id,
        {
          title: column.title,
          order: index + 1,
        },
      )
        .pipe(
          take(1),
        )
        .subscribe();
    });
  }

  public createColumn(): void {
    if (!this.columnName) {
      return;
    }
    this.columnApiService.createColumn(
      this.boardId,
      { title: this.columnName.trim(), order: this.columnsArray.length + 1 },
    ).subscribe(
      () => this.getColumns(),
    );
    this.columnName = '';
  }

  public openDialog() {
    const ref = this.dialog.open(BoardsDialogComponent, { data: DialogUse.column });
    ref.afterClosed().subscribe(
      () => this.createColumn(),
    );
  }


  public dropGroup(event: CdkDragDrop<Column[], any>) {
    moveItemInArray(this.columnsArray, event.previousIndex, event.currentIndex);

    //
    // this.columnApiService.updateColumn(this.boardId, z[1].id, {
    //   title: '2',
    //   order: 2,
    // }).subscribe()
    //
    // this.columnApiService.updateColumn(this.boardId, z[2].id, {
    //   title: '3',
    //   order: 3,
    // }).subscribe()
    //
    //
    // this.columnApiService.updateColumn(this.boardId, z[0].id, {
    //   title: '1',
    //   order: 1,
    // }).subscribe()

    // z.forEach((item) => {
      //   this.columnApiService.updateColumn(this.boardId, item.id, {
      //     title: item.title,
      //     order: item.order,
      //   }).subscribe()
      // });
    // console.log(this.columnsArray, 'b');
    // this.z = this.columnsArray.map((column, index): Column => {
    //   return {
    //     id: column.id,
    //     title: column.title,
    //     order: index + 1,
    //     tasks: column.tasks,
    //   }
    // });
    //
    // this.z.forEach((i, idx) => {
    //   this.columnApiService.updateColumn(
    //     this.boardId,
    //     i.id,
    //     {
    //       title: i.title,
    //       order: idx + 1,
    //     }
    //   ).subscribe()
    // })
  }

  public getConnectedList(): any[] {
    return this.columnsArray.map((x: { order: any; }) => `${ x.order }`);
  }

  private getColumns(): void {
    this.columnApiService.getColumns(this.boardId)
      .pipe(
        switchMap(columns => {

          return forkJoin(
            columns.map(col => this.columnApiService.getColumn(this.boardId, col.id))
          );
        }),
      )
      .subscribe(res => {
        this.columnsArray = res.sort((prev, next) => prev.order - next.order);
        console.log(this.columnsArray, 'start');
      });
  }
}
