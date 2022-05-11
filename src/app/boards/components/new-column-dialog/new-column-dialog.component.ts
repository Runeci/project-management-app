import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BoardDialogService } from '@boards/services/board-dialog.service';
import { ColumnsApiService } from '@boards/services/columns-api.service';

@Component({
  selector: 'app-new-column-dialog',
  templateUrl: './new-column-dialog.component.html',
  styleUrls: ['./new-column-dialog.component.scss'],
})
export class NewColumnDialogComponent {
  public form = this.fb.group({
    title: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private columnApiService: ColumnsApiService,
    private dialogService: BoardDialogService,
  ) {
  }

  public onSubmit() {
    this.dialogService.newEvent(this.form.value.title);
  }
}
