import firebase from "firebase";
import * as auth from "./auth";
import * as firestore from "./firestore";
import * as error from "./error";
import * as storage from "./storage";
export { default as Provider } from "./Provider";
export { default as AccountReducer } from "./redux/account";
export * from "./redux/account";
export const initialize = (config) => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
};
let config = {};
const firebaseHelper = {
    initialize: (_config) => {
        config = _config;
        initialize(config);
    },
    auth,
    firestore,
    error,
    storage,
};
export default firebaseHelper;
//# sourceMappingURL=index.js.map