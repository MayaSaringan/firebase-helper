import firebase from "firebase";
interface MetadataDatabase {
    createdAt: firebase.firestore.FieldValue;
    editedAt: firebase.firestore.FieldValue;
}
export declare const createMetadata: () => MetadataDatabase;
export declare const updateMetadata: () => Omit<MetadataDatabase, "createdAt">;
export declare const add: <T>(collRef: firebase.firestore.CollectionReference, data: Omit<T, "id">) => Promise<T>;
export declare const set: <T>(collRef: firebase.firestore.CollectionReference, data: T) => Promise<T>;
export declare const edit: <T>(collRef: firebase.firestore.CollectionReference, data: T) => Promise<T>;
export declare const remove: (collRef: firebase.firestore.CollectionReference, data: {
    id: string;
}) => Promise<{
    id: string;
}>;
export declare const get: <T>(collRef: firebase.firestore.CollectionReference, id: string) => Promise<T>;
export declare const getAll: <T>(collRef: firebase.firestore.CollectionReference) => Promise<T[]>;
export {};
