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
class FirebaseHelper {
    config = {};
    initialize = (config) => {
        this.config = config;
        initialize(this.config);
    };
    auth = auth;
    firestore = firestore;
    error = error;
    storage = {
        upload: (uploadString, path, name, type) => storage.upload(this.config.storageBucket, uploadString, path, name, type),
    };
}
export default FirebaseHelper;
//# sourceMappingURL=index.js.map