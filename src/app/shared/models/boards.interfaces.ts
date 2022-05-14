import { Column } from '@shared/models/columns.interfaces';

export interface Board {
  title: string,
  description: string,
  id?: string,
  columns?: Column[],
}
