import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "./types";

interface IUserState {
    user: IUser | null;
}

const initialState: IUserState = {
    user: null,
};

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        // login: (state, { payload }) => {
        //     // const userEmail = action.payload;
        //     const userEmail = payload;
        // },
        logout: () => initialState,
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
    },
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;
