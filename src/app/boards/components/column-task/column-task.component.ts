import { Component, Input } from '@angular/core';
import {
 animate, state, style, transition, trigger,
} from '@angular/animations';

@Component({
  selector: 'app-column-task',
  templateUrl: './column-task.component.html',
  styleUrls: ['./column-task.component.scss'],
  animations: [
    trigger('hovered', [
      state('start', style({
        visibility: 'hidden',
      })),
      state('end', style({
        visibility: 'visible',
      })),
      transition('start <=> end', animate('0s ease-out')),
    ]),
  ],
})
export class ColumnTaskComponent {
  @Input() task: any;

  public animationStatus: string = 'start';

  public startAnimation(): void {
    this.animationStatus = 'end';
  }

  public stopAnimation(): void {
    this.animationStatus = 'start';
  }
}
