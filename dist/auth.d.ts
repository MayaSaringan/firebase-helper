import firebase from "firebase";
export declare const getCurrUser: () => firebase.User;
export declare const linkWithRedirect: () => Promise<void>;
export declare const signInAnonymously: () => Promise<void>;
export declare const signInWithRedirect_Google: () => Promise<void>;
export declare const signOut: () => Promise<void>;
