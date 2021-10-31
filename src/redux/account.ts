import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Account from "../types/Account";

type AccountState = Account;

const initialState: AccountState = {};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Partial<AccountState>>) => ({
      ...state,
      ...action.payload,
    }),
    logout: () => ({}),
  },
});
export const { login, logout } = accountSlice.actions;
export default accountSlice.reducer;

const selectAccount = (state: { account: AccountState }) => state.account;

export const selectIsAuthenticated = createSelector(
  selectAccount,
  ({ idToken }) => idToken !== undefined && idToken !== null,
);

export const selectIsGuest = createSelector(
  selectAccount,
  selectIsAuthenticated,
  ({ type }, isAuthenticated) => type === "Guest" && isAuthenticated,
);

export const selectIsAccount = createSelector(
  selectAccount,
  selectIsAuthenticated,
  ({ type }, isAuthenticated) => type !== "Guest" && isAuthenticated,
);

export const selectIdToken = createSelector(
  selectAccount,
  ({ idToken }) => idToken,
);

export const selectUid = createSelector(selectAccount, ({ uid }) => uid);
