export interface Column {
  id: string,
  title: string,
  order: number,
  tasks: TaskI[],
}

export interface TaskI {
  id: string,
  title: string,
  order: number,
  done: boolean,
  description: string,
  userId: string,
  files: File[],
}

export interface File {
  filename: string,
  fileSize: number,
}
