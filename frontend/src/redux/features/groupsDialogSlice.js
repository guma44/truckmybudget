import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false
}

const groupDialogSlice = createSlice({
  name: 'groupDialog',
  initialState,
  reducers: {
    openAddGroupDialog(state) {
      state.isOpen = true
    },
    closeAddGroupDialog(state) {
      state.isOpen = false
    }
  },
})

export const { openAddGroupDialog, closeAddGroupDialog } = groupDialogSlice.actions
export default groupDialogSlice.reducer