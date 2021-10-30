import firebase from "firebase";
import * as auth from "./auth";
import * as firestore from "./firestore";
import * as error from "./error";
import * as storage from "./storage";
export { default as Provider } from "./Provider";
export type { default as Metadata } from "./types/Metadata";
export type { default as Account } from "./types/Account";
export { default as AccountReducer } from "./redux/account";
export * from "./redux/account";

export const initialize = (config: Record<string, string>): void => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
};

class FirebaseHelper {
  config: Record<string, string> = {};
  initialize = (config: Record<string, string>): void => {
    this.config = config;
    initialize(this.config);
  };
  auth = auth;
  firestore = firestore;
  error = error;
  storage = {
    upload: (
      uploadString: string,
      path: string,
      name: string,
      type: "base64" | string,
    ): Promise<string> =>
      storage.upload(this.config.storageBucket, uploadString, path, name, type),
  };
}
export default FirebaseHelper;
