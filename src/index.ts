import firebase from "firebase";
import * as auth from "./auth";
import * as firestore from "./firestore";
import * as error from "./error";
import * as storage from "./storage";
export { default as Provider } from "./Provider";
export type { default as Metadata } from "./types/Metadata";
export type { default as Account, AccountID } from "./types/Account";
export { default as AccountReducer } from "./redux/account";
export * from "./redux/account";

export const initialize = (config: Record<string, string>): void => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
};

let config: Record<string, string> = {};
const firebaseHelper = {
  initialize: (_config: Record<string, string>): void => {
    config = _config;
    initialize(config);
  },
  auth,
  firestore,
  error,
  storage,
};
export default firebaseHelper;
