import * as auth from "./auth";
import * as firestore from "./firestore";
import * as error from "./error";
export { default as Provider } from "./Provider";
export type { default as Metadata } from "./types/Metadata";
export type { default as Account } from "./types/Account";
export { default as AccountReducer } from "./redux/account";
export * from "./redux/account";
export declare const initialize: (config: Object) => void;
declare const firebaseHelper: {
    initialize: (config: Object) => void;
    auth: typeof auth;
    firestore: typeof firestore;
    error: typeof error;
};
export default firebaseHelper;
