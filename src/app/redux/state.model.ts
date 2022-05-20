import { File } from '@shared/models/columns.interfaces';

export interface IFileState {
  files: File[];
}

export const initialFilesState: IFileState = {
  files: [],
};

export interface IAppState {
  files: IFileState;
}

export const initialAppState: IAppState = {
  files: initialFilesState,
};
