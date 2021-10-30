import * as auth from "./auth";
import * as firestore from "./firestore";
import * as error from "./error";
import * as storage from "./storage";
export { default as Provider } from "./Provider";
export type { default as Metadata } from "./types/Metadata";
export type { default as Account } from "./types/Account";
export { default as AccountReducer } from "./redux/account";
export * from "./redux/account";
export declare const initialize: (config: Record<string, string>) => void;
declare const firebaseHelper: {
    initialize: (_config: Record<string, string>) => void;
    auth: typeof auth;
    firestore: typeof firestore;
    error: typeof error;
    storage: typeof storage;
};
export default firebaseHelper;
