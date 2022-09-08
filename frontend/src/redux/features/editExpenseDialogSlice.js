import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
    expense: null
}

const editExpenseDialogSlice = createSlice({
  name: 'editExpenseDialog',
  initialState,
  reducers: {
    openEditExpenseDialog(state, action) {
      state.isOpen = true
      state.expense = action.payload
    },
    closeEditExpenseDialog(state) {
      state.isOpen = false
      state.expense = null
    }
  },
})

export const { openEditExpenseDialog, closeEditExpenseDialog } = editExpenseDialogSlice.actions
export default editExpenseDialogSlice.reducer