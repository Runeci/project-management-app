export interface TaskI {
  id: string,
  title: string,
  order: number,
  done: boolean,
  description?: string,
  userId?: string,
  boardId?: string,
  columnId?: string,
}
