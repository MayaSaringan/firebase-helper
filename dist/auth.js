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
    return getCurrUser().linkWithRedirect(new firebase.auth.GoogleAuthProvider());
};
export const signInAnonymously = async () => {
    await firebase.auth().signInAnonymously();
};
export const signInWithRedirect_Google = () => {
    return firebase
        .auth()
        .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
};
export const signOut = () => {
    return firebase.auth().signOut();
};
//# sourceMappingURL=auth.js.map