import * as auth from "./auth";
import * as firestore from "./firestore";
import * as error from "./error";
export { default as Provider } from "./Provider";
export type { UserData } from "./Provider";
export declare const initialize: (config: Object) => void;
declare const firebaseHelper: {
    initialize: (config: Object) => void;
    auth: typeof auth;
    firestore: typeof firestore;
    error: typeof error;
};
export default firebaseHelper;
