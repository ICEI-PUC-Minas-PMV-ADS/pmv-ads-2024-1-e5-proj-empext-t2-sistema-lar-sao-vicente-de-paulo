import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  loading: boolean;
}

const initialState = {
  loading: false,
} as AppState;

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<AppState["loading"]>) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
});

export const appReducer = appSlice.reducer;

export const { setLoading } = appSlice.actions;
