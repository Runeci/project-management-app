import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BoardDialogService } from '@boards/services/board-dialog.service';
import { ColumnsApiService } from '@boards/services/columns-api.service';
import { MatDialogRef } from '@angular/material/dialog';

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
    public dialogRef: MatDialogRef<NewColumnDialogComponent>,
    private fb: FormBuilder,
  ) {
  }

  public onSubmit() {
    this.dialogRef.close({
      columnTitle: this.form.value.title,
    })
  }
}
