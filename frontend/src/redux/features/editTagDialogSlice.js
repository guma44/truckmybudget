import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
    tag: null
}

const editTagDialogSlice = createSlice({
  name: 'editTagDialog',
  initialState,
  reducers: {
    openEditTagDialog(state, action) {
      state.isOpen = true
      state.tag = action.payload
    },
    closeEditTagDialog(state) {
      state.isOpen = false
      state.tag = null
    }
  },
})

export const { openEditTagDialog, closeEditTagDialog } = editTagDialogSlice.actions
export default editTagDialogSlice.reducer