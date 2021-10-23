import { createSelector, createSlice } from "@reduxjs/toolkit";
const initialState = {};
const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        login: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        logout: () => ({}),
    },
});
export const { login, logout } = accountSlice.actions;
export default accountSlice.reducer;
const selectAccount = (state) => state.account;
export const selectIsAuthenticated = createSelector(selectAccount, ({ idToken }) => idToken !== undefined && idToken !== null);
export const selectIsGuest = createSelector(selectAccount, selectIsAuthenticated, ({ type }, isAuthenticated) => type === "Guest" && isAuthenticated);
export const selectIsAccount = createSelector(selectAccount, selectIsAuthenticated, ({ type }, isAuthenticated) => type !== "Guest" && isAuthenticated);
export const selectIdToken = createSelector(selectAccount, ({ idToken }) => idToken);
//# sourceMappingURL=account.js.map