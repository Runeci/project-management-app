import { createReducer, on } from "@ngrx/store";
import { setFiles } from "../actions/file.action";
import { initialFilesState } from "../state.model";

export const filesReducer = createReducer(
    initialFilesState,
    on(setFiles,
      (state, { file }) => ({
        ...state,
        files: [...state.files, file],
      })),
  );