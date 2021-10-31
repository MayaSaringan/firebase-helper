import { ForbiddenError, InternalError } from "./error";
import firebase from "firebase";
export const createMetadata = () => ({
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    editedAt: firebase.firestore.FieldValue.serverTimestamp(),
});
export const updateMetadata = () => ({
    editedAt: firebase.firestore.FieldValue.serverTimestamp(),
});
const interpretFirebaseDocument = (id, snapshot) => {
    const snapshotData = snapshot.data();
    if (!snapshot.exists || !snapshotData) {
        throw new InternalError("data is null");
    }
    const { createdAt, editedAt, ...filteredData } = snapshotData;
    const data = {
        ...filteredData,
        createdAt: createdAt.toMillis(),
        editedAt: editedAt.toMillis(),
        id,
    };
    return data;
};
export const add = (collRef, data) => {
    return collRef
        .add({
        ...data,
        ...createMetadata(),
    })
        .then((docRef) => docRef.get())
        .then((snapshot) => Promise.resolve(interpretFirebaseDocument(snapshot.id, snapshot)))
        .catch((e) => {
        if (e instanceof InternalError) {
            throw e;
        }
        throw new ForbiddenError(`Add operation for firebase failed: ${e.message}`);
    });
};
export const set = (collRef, data) => {
    const { id, ...restData } = data;
    console.log(restData);
    return collRef
        .doc(id)
        .set({
        ...restData,
        ...createMetadata(),
    }, { merge: true })
        .then(() => collRef.doc(id).get())
        .then((snapshot) => Promise.resolve(interpretFirebaseDocument(snapshot.id, snapshot)))
        .catch((e) => {
        if (e instanceof InternalError) {
            throw e;
        }
        throw new ForbiddenError(`Set operation for firebase failed: ${e.message}`);
    });
};
export const edit = (collRef, data) => {
    const { id, ...restData } = data;
    return collRef
        .doc(id)
        .update({
        ...restData,
        ...updateMetadata(),
    })
        .then(() => collRef.doc(id).get())
        .then((snapshot) => Promise.resolve(interpretFirebaseDocument(snapshot.id, snapshot)))
        .catch((e) => {
        if (e instanceof InternalError) {
            throw e;
        }
        throw new ForbiddenError(`Edit operation for firebase failed: ${e.message}`);
    });
};
export const remove = (collRef, data) => {
    return collRef
        .doc(data.id)
        .delete()
        .then(() => ({ id: data.id }))
        .catch((e) => {
        if (e instanceof InternalError) {
            throw e;
        }
        throw new ForbiddenError(`Add operation for firebase failed: ${e.message}`);
    });
};
export const get = (collRef, id) => {
    return collRef
        .doc(id)
        .get()
        .then((snapshot) => Promise.resolve(interpretFirebaseDocument(snapshot.id, snapshot)))
        .catch((e) => {
        if (e instanceof InternalError) {
            throw e;
        }
        throw new ForbiddenError(`Add operation for firebase failed: ${e.message}`);
    });
};
export const getAll = (collRef) => {
    return collRef
        .get()
        .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((snapshot) => {
            data.push(interpretFirebaseDocument(snapshot.id, snapshot));
        });
        return data;
    })
        .catch((e) => {
        if (e instanceof InternalError) {
            throw e;
        }
        throw new ForbiddenError(`Add operation for firebase failed: ${e.message}`);
    });
};
//# sourceMappingURL=firestore.js.map