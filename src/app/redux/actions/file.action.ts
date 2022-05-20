import { createAction, props } from '@ngrx/store';
import { File } from '@shared/models/columns.interfaces';

export const setFiles = createAction(
    '[FILES SERVICE] SET FILES',
    props<{ file: File }>(),
  );