import firebase from "firebase";

// re-exports some firebase stuff for ease

export const getCurrUser = (): firebase.User => {
  const currUser = firebase.auth().currentUser;
  if (!currUser) {
    throw new Error("No current user");
  }
  return currUser;
};

export const linkWithRedirect = (): Promise<void> => {
  return getCurrUser().linkWithRedirect(new firebase.auth.GoogleAuthProvider());
};

export const signInAnonymously = async (): Promise<void> => {
  await firebase.auth().signInAnonymously();
};
export const signInWithRedirect_Google = (): Promise<void> => {
  return firebase
    .auth()
    .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
};
export const signOut = (): Promise<void> => {
  return firebase.auth().signOut();
};
