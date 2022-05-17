import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskFile, TaskI } from '@shared/models/tasks.interfaces';
import { FormBuilder } from '@angular/forms';
import { Board } from '@shared/models/boards.interfaces';
import { Column } from '@shared/models/columns.interfaces';
import { UserInfo } from '@shared/models/user.interfaces';
import { Observable } from 'rxjs';
import { FileService } from '@core/services/file/file.service';
import saveAs from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';
import { TaskApiService } from '@boards/services/task-api.service';

@Component({
  selector: 'app-task-edit-boards-dialog',
  templateUrl: './task-edit-dialog.component.html',
  styleUrls: ['./task-edit-dialog.component.scss'],
})
export class TaskEditDialogComponent {
  public editDescription = false;

  public editTitle = false;

  public editTaskForm = this.fb.group({
    title: [`${this.data.task.title}`],
    description: [`${this.data.task.description}` || ''],
  });

  public user$: Observable<UserInfo> | undefined;

  url: any;

  selectedFile?: [File | undefined] | Blob | string;

  files!: TaskFile[];

  fileUrl: any;

  selectFile: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<TaskEditDialogComponent>,
    private fb: FormBuilder,
    private fileService: FileService,
    private sanitizer: DomSanitizer,
    private tasksApiService: TaskApiService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      task: TaskI;
      columnId: Column['id'];
      boardId: Board['id'];
      taskFiles: TaskFile[];
      userName: string
    }
  ) {}

  public ngOnInit() {
    this.data.taskFiles.forEach((file: TaskFile, index: number) => {
      this.fileService
        .getFile(this.data.task.id!, file.filename)
        .subscribe((res) => {
          const url = TaskEditDialogComponent.typedArrayToURL(
            res,
            'image/jpeg; charset=utf-8',
          );
          this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(url);
          this.data.taskFiles[index].fileUrl = this.fileUrl;
        });
    });
  }

  public onSubmit() {
    this.dialogRef.close({
      title: this.editTaskForm.value.title,
      description: this.editTaskForm.value.description,
    });
  }

  onSelectFile(event: { target: any }) {
    const {
      target: { files },
    } = event;
    [this.selectedFile] = files;
    if (event.target!.files) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile as Blob);
      reader.onload = (selectEvent: any) => {
        this.url = selectEvent.target.result;
      };
      this.selectFile = true;
    }
  }

  onUpLoad(): void {
    const fileData = new FormData();
    fileData.set('taskId', this.data.task.id!);
    fileData.set('file', this.selectedFile as Blob);
    this.fileService.upLoadFile(fileData).subscribe();
  }

  onOpenFile(name: string): void {
    this.fileService.getFile(this.data.task.id!, name).subscribe((res) => {
      const url = TaskEditDialogComponent.typedArrayToURL(
        res,
        'image/jpeg; charset=utf-8',
      );
      window.open(url);
    });
  }

  onDownloadFile(filename: string): void {
    this.fileService
      .getFile(this.data.task.id!, filename)
      .subscribe((res: BlobPart) => {
        const blob: any = new Blob([res], {
          type: 'image/jpeg; charset=utf-8',
        });
        saveAs(blob, filename);
      });
  }

  static typedArrayToURL(typedArray: BlobPart, mimeType: string): string {
    return window.URL.createObjectURL(
      new Blob([typedArray], { type: mimeType }),
    );
  }
}
