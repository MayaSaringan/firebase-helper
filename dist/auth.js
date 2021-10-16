import firebase from "firebase";
// re-exports some firebase stuff for ease
export const getCurrUser = () => {
    const currUser = firebase.auth().currentUser;
    if (!currUser) {
        throw new Error("No current user");
    }
    return currUser;
};
export const linkWithRedirect = () => {
    getCurrUser().linkWithRedirect(new firebase.auth.GoogleAuthProvider());
};
export const signInAnonymously = () => {
    firebase.auth().signInAnonymously;
};
export const signInWithRedirect_Google = () => {
    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
};
export const signOut = () => {
    firebase.auth().signOut;
};
//# sourceMappingURL=auth.js.map