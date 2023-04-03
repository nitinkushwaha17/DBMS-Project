import { createSlice } from '@reduxjs/toolkit';

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    message: "",
    open: false
  },
  reducers: {
    show: (state, action) => {
      console.log(action.payload);
      state.open = true;
      state.message=action.payload;
    },
    close: (state) => {
      state.open = false;
    },
  }
})

export const { show, close } = snackbarSlice.actions

export default snackbarSlice.reducer