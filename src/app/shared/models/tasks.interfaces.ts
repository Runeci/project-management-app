export interface TaskI {
  id?: string;
  title: string;
  order: number;
  done: boolean;
  description?: string;
  userId?: string;
  boardId?: string;
  columnId?: string;
  files?: TaskFile[]
}

export interface TaskFile {
  filename: string;
  fileSize: number | null;
  fileUrl?: any;
}
