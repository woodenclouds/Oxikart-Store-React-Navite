import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVerified: false,
  token: null,
  role: '',
  user_id: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            return {
               ...state,
                isVerified: action.payload.isVerified,
                token: action.payload.token,
                role: action.payload.role,
                user_id: action.payload.user_id,
            }
        },
        clearUserInfo: (state) => initialState,
    },
})

export const { setUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;