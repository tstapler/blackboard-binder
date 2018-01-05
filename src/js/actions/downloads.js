import { createAction } from 'redux-actions'

export const selectFileAction = createAction('SELECT_FILE')
export const unselectFileAction = createAction('UNSELECT_FILE')
export const downloadSelectedFilesAction = createAction('DOWNLOAD_SELECTED_FILES')
export const markFileAsDownloadedAction = createAction('MARK_AS_DOWNLOADED')
export const selectAllFilesAction = createAction('SELECT_ALL_FILES')
export const unselectAllFilesAction = createAction('UNSELECT_ALL_FILES')
export const selectUndownloadedFilesAction = createAction('SELECT_UNDOWNLOADED')
