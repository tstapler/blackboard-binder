import { createAction } from 'redux-actions'

export const selectFile = createAction('SELECT_FILE')
export const unselectFile = createAction('UNSELECT_FILE')
export const downloadSelectedFiles = createAction('DOWNLOAD_SELECTED_FILES')
