import { Component, Input } from '@angular/core';
import {
 animate, state, style, transition, trigger,
} from '@angular/animations';
import { Router } from '@angular/router';
import { Board } from '../../../shared/models/boards.interfaces';
import { BoardsApiService } from '../../services/boards-api.service';

@Component({
  selector: 'app-board-preview',
  templateUrl: './board-preview.component.html',
  styleUrls: ['./board-preview.component.scss'],
  animations: [
    trigger('hoveredBoard', [
      state('start', style({
        right: '-40px',
        bottom: '10px',
      })),
      state('end', style({
        right: '10px',
        bottom: '10px',
      })),
      transition('start <=> end', animate('200ms ease-out')),
    ]),
  ],
})
export class BoardPreviewComponent {
  @Input() board: Board | undefined;

  constructor(
    private boardsService: BoardsApiService,
    private router: Router,
    ) {
  }

  public animationStatus: string = 'start';

  public startAnimation(): void {
    this.animationStatus = 'end';
  }

  public stopAnimation(): void {
    this.animationStatus = 'start';
  }

  public onDelete(id: Board['id']): void {
    this.boardsService.deleteBoard(id).subscribe();
  }

  public goToBoard(id: string | undefined): void {
    this.router.navigate(['/boards', id]);
  }
}
