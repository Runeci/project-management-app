import { Component, OnInit } from '@angular/core';
import { ColumnsApiService } from '@boards/services/columns-api.service';
import { Column } from '@shared/models/columns.interfaces';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {
  public columnsArr: Column[] = [];

  constructor(private columnApiService: ColumnsApiService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.columnApiService.getColumns(this.activatedRoute.snapshot.params['id'])
      .subscribe((res) => this.columnsArr = res);
  }

  public createColumn(): void {
  }

}
