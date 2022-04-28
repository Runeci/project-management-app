import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../../../shared/models/boards.interfaces';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {

  public boardsArr$: Observable<Board[]> | undefined;

  constructor(private boardsService: BoardsService) { }

  ngOnInit(): void {
    this.boardsService.getBoards()
      .pipe( (r) => this.boardsArr$ = r)
  }
}
