import firebase from "firebase";
import * as auth from "./auth";
import * as firestore from "./firestore";
import * as error from "./error";
export { default as Provider } from "./Provider";
export type { default as Metadata } from "./types/Metadata";
export type { default as Account } from "./types/Account";
export { default as AccountReducer } from "./redux/account";
export * from "./redux/account";

// eslint-disable-next-line @typescript-eslint/ban-types
export const initialize = (config: Object): void => {
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
