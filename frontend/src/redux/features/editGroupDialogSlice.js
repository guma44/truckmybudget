import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
    group: null
}

const editGroupDialogSlice = createSlice({
  name: 'editGroupDialog',
  initialState,
  reducers: {
    openEditGroupDialog(state, action) {
      state.isOpen = true
      state.group = action.payload
    },
    closeEditGroupDialog(state) {
      state.isOpen = false
      state.group = null
    }
  },
})

export const { openEditGroupDialog, closeEditGroupDialog } = editGroupDialogSlice.actions
export default editGroupDialogSlice.reducer