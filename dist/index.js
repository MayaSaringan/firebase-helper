import firebase from "firebase";
import * as auth from "./auth";
import * as firestore from "./firestore";
import * as error from "./error";
export { default as Provider } from "./Provider";
// eslint-disable-next-line @typescript-eslint/ban-types
export const initialize = (config) => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
};
const firebaseHelper = {
    initialize,
    auth,
    firestore,
    error,
};
export default firebaseHelper;
//# sourceMappingURL=index.js.map