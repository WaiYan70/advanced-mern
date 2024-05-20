// This file process the data and JWT in local storage and cookie
import { createSlice } from "@reduxjs/toolkit";

// to check local storage 
const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
};

/* 
    Two Functions :  
    1. setting credenetials which set user info to local storage 
    2. LogOut which is going to take info out of local storage
*/
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredential: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    }
})

export const { setCredential, logout } = authSlice.actions;
export default authSlice.reducer;