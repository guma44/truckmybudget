import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false
}

const tagDialogSlice = createSlice({
  name: 'tagDialog',
  initialState,
  reducers: {
    openAddTagDialog(state) {
      state.isOpen = true
    },
    closeAddTagDialog(state) {
      state.isOpen = false
    }
  },
})

export const { openAddTagDialog, closeAddTagDialog } = tagDialogSlice.actions
export default tagDialogSlice.reducer