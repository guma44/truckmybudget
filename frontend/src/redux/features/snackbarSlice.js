import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
    message: "",
    severity: ""
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar(state, action) {
      state.isOpen = true
      state.message = action.payload.message,
      state.severity = action.payload.severity
    },
    closeSnackbar(state) {
      state.isOpen = false
    }
  },
})

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions
export default snackbarSlice.reducer