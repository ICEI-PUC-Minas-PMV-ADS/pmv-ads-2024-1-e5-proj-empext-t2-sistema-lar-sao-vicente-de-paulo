import { IUser } from '@/interface/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: IUser;
    token: string;
}

const initialState = { user: null as any, token: null as any } as AuthState;

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser: (state, action: PayloadAction<AuthState['user']>) => {
            return {
                ...state,
                user: action.payload,
            };
        },

        setAuthToken: (state, action: PayloadAction<AuthState['token']>) => {
            return {
                ...state,
                token: action.payload,
            };
        },
    },
});

export const authReducer = authSlice.reducer;

export const { setAuthToken, setAuthUser } = authSlice.actions;
