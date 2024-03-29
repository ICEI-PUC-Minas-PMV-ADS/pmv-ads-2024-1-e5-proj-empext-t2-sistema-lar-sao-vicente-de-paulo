import { IUsuario } from "@/interface/IUsuario";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  usuario: IUsuario;
  token: string;
}

const initialState = { usuario: null as any, token: null as any } as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUsuario: (state, action: PayloadAction<AuthState["usuario"]>) => {
      return {
        ...state,
        usuario: action.payload,
      };
    },

    setAuthToken: (state, action: PayloadAction<AuthState["token"]>) => {
      return {
        ...state,
        token: action.payload,
      };
    },
  },
});

export const authReducer = authSlice.reducer;

export const { setAuthToken, setAuthUsuario } = authSlice.actions;
