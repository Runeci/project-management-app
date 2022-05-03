import {
 Component, Input, OnInit,
} from '@angular/core';
import { ColumnsApiService } from '@boards/services/columns-api.service';
import { Board } from '@shared/models/boards.interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-column',
  templateUrl: './add-new-column.component.html',
  styleUrls: ['./add-new-column.component.scss'],
})
export class AddNewColumnComponent implements OnInit {
  @Input() columnOrder!: number | undefined;

  public columnInput: string = '';

  private boardId: Board['id'];

  constructor(
    private columnApiService: ColumnsApiService,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.boardId = this.activatedRoute.snapshot.params['id'];
  }

  public addColumn(): void {
    if (this.columnInput) {
      this.columnApiService.createColumn(
        this.boardId,
        {
          title: this.columnInput.trim(),
          order: this.columnOrder!,
        },
)
        .subscribe();
    }
  }
}
