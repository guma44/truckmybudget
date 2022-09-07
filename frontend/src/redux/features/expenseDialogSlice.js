import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false
}

const expenseDialogSlice = createSlice({
  name: 'expenseDialog',
  initialState,
  reducers: {
    openExpenseDialog(state) {
      state.isOpen = true
    },
    closeExpenseDialog(state) {
      state.isOpen = false
    }
  },
})

export const { openExpenseDialog, closeExpenseDialog } = expenseDialogSlice.actions
export default expenseDialogSlice.reducer