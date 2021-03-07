import { createSlice } from '@reduxjs/toolkit';
import * as API from "../../_DATA";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authedUser: null,
        users: [],
    },
    reducers: {
        userLoggedIn: (state, action) => {
            state.authedUser = action.payload;
        },
        userLoggedOut: state => {
            state.authedUser = null;
        },
        usersReceived: (state, action) => {
            state.users = action.payload;
        },
    },
});

export const { userLoggedIn, userLoggedOut, usersReceived } = authSlice.actions;

export const loginUser = user => dispatch => {
    dispatch(userLoggedIn(user));
    localStorage.setItem('authedUser', JSON.stringify(user));
};

export const logoutUser = () => dispatch => {
    dispatch(userLoggedOut());
    localStorage.removeItem('authedUser');
};

export const fetchUsers = () => dispatch => {
    API._getUsers()
        .then(users => {
            dispatch(usersReceived(users));
        });
};

export const getAuthedUser = state => state.auth.authedUser;
export const getAllUsers = state => state.auth.users;

export default authSlice.reducer;
