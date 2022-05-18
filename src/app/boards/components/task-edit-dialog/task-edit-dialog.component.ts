import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskFile, TaskI } from '@shared/models/tasks.interfaces';
import { FormBuilder } from '@angular/forms';
import { Board } from '@shared/models/boards.interfaces';
import { Column } from '@shared/models/columns.interfaces';
import { FileService } from '@core/services/file/file.service';
import saveAs from 'file-saver';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TaskApiService } from '@boards/services/task-api.service';

@Component({
  selector: 'app-task-edit-boards-dialog',
  templateUrl: './task-edit-dialog.component.html',
  styleUrls: ['./task-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskEditDialogComponent implements OnInit {
  public editDescription = false;

  public editTitle = false;

  public editTaskForm = this.fb.group({
    title: [`${this.data.task.title}`],
    description: [`${this.data.task.description}` || ''],
  });

  url!: string;

  selectedFile?: [File | undefined] | Blob | string;

  fileUrl!: SafeUrl;

  selectFile: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<TaskEditDialogComponent>,
    private fb: FormBuilder,
    private fileService: FileService,
    private sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef,
    public taskService: TaskApiService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      task: TaskI;
      columnId: Column['id'];
      boardId: Board['id'];
      taskFiles: TaskFile[];
      userName: string;
    },
  ) {}

  public ngOnInit() {
    this.taskService.getFilesFromTask(this.data.boardId!, this.data.columnId);
    this.taskService.filesNumber$.subscribe((files) => {
      this.changeDetectorRef.markForCheck();
      this.data.taskFiles = files;
      this.getFiles();
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
        this.changeDetectorRef.markForCheck();
        this.url = selectEvent.target.result;
      };
      this.selectFile = true;
    }
  }

  getFiles() {
    this.data.taskFiles.forEach((file: TaskFile, index: number) => {
      this.fileService
        .getFile(this.data.task.id!, file.filename)
        .subscribe((res) => {
          this.changeDetectorRef.markForCheck();
          const url = TaskEditDialogComponent.typedArrayToURL(
            res,
            'image/jpeg; charset=utf-8',
          );
          this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(url);
          this.data.taskFiles[index].fileUrl = this.fileUrl;
        });
    });
  }

  onUpLoad(): void {
    const fileData = new FormData();
    fileData.set('taskId', this.data.task.id!);
    fileData.set('file', this.selectedFile as Blob);
    this.fileService.upLoadFile(fileData).subscribe(() => {
      this.taskService.getFilesFromTask(this.data.boardId!, this.data.columnId);
      this.taskService.filesNumber$.subscribe((files) => {
        this.changeDetectorRef.markForCheck();
        this.data.taskFiles = files;
        this.getFiles();
        this.selectFile = false;
      });
    });
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
