import firebase from "firebase";
export * from "./auth";
export * from "./firestore";
export * from "./error";
export { default as Provider } from "./Provider";
export type { UserData } from "./Provider";

// eslint-disable-next-line @typescript-eslint/ban-types
export const initialize = (config: Object): void => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
};
