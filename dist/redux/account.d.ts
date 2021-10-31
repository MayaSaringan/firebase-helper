import Account from "../types/Account";
declare type AccountState = Account;
export declare const login: import("@reduxjs/toolkit").ActionCreatorWithPayload<Partial<Account>, string>, logout: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
declare const _default: import("redux").Reducer<Account, import("redux").AnyAction>;
export default _default;
export declare const selectIsAuthenticated: import("reselect").OutputSelector<{
    account: AccountState;
}, boolean, (res: Account) => boolean>;
export declare const selectIsGuest: import("reselect").OutputSelector<{
    account: AccountState;
}, boolean, (res1: Account, res2: boolean) => boolean>;
export declare const selectIsAccount: import("reselect").OutputSelector<{
    account: AccountState;
}, boolean, (res1: Account, res2: boolean) => boolean>;
export declare const selectIdToken: import("reselect").OutputSelector<{
    account: AccountState;
}, string | undefined, (res: Account) => string | undefined>;
export declare const selectUid: import("reselect").OutputSelector<{
    account: AccountState;
}, string | undefined, (res: Account) => string | undefined>;
