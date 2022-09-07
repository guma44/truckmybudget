import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false
}

const accountDialogSlice = createSlice({
  name: 'accountDialog',
  initialState,
  reducers: {
    openAddAccountDialog(state) {
      state.isOpen = true
    },
    closeAddAccountDialog(state) {
      state.isOpen = false
    }
  },
})

export const { openAddAccountDialog, closeAddAccountDialog } = accountDialogSlice.actions
export default accountDialogSlice.reducer