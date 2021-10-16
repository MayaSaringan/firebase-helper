import firebase from "firebase";

// re-exports some firebase stuff for ease

// eslint-disable-next-line @typescript-eslint/ban-types
export const initialize = (config: Object): void => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
};

export const getCurrUser = (): firebase.User => {
  const currUser = firebase.auth().currentUser;
  if (!currUser) {
    throw new Error("No current user");
  }
  return currUser;
};

export const linkWithRedirect = (): void => {
  getCurrUser().linkWithRedirect(new firebase.auth.GoogleAuthProvider());
};

export const signInAnonymously = (): void => {
  firebase.auth().signInAnonymously;
};
export const signInWithRedirect_Google = (): void => {
  firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
};
export const signOut = (): void => {
  firebase.auth().signOut;
};
