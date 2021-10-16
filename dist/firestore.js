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
    return new Promise((res, rej) => {
        collRef
            .add({
            ...data,
            ...createMetadata(),
        })
            .then((docRef) => {
            docRef.get().then((snapshot) => {
                res(interpretFirebaseDocument(snapshot.id, snapshot));
            });
        })
            .catch((e) => {
            if (e instanceof InternalError) {
                rej(e); // forward error
                return;
            }
            rej(new ForbiddenError(`Add operation for firebase failed: ${e.message}`));
        });
    });
};
export const set = (collRef, data) => {
    return new Promise((res, rej) => {
        const { id, ...restData } = data;
        console.log(restData);
        collRef
            .doc(id)
            .set({
            ...restData,
            ...createMetadata(),
        }, { merge: true })
            .then(() => {
            collRef
                .doc(id)
                .get()
                .then((snapshot) => {
                res(interpretFirebaseDocument(snapshot.id, snapshot));
            });
        })
            .catch((e) => {
            console.log(e);
            if (e instanceof InternalError) {
                rej(e); // forward error
                return;
            }
            rej(new ForbiddenError(`Set operation for firebase failed: ${e.message}`));
        });
    });
};
export const edit = (collRef, data) => {
    return new Promise((res, rej) => {
        const { id, ...restData } = data;
        collRef
            .doc(id)
            .update({
            ...restData,
            ...updateMetadata(),
        })
            .then(() => {
            collRef
                .doc(id)
                .get()
                .then((snapshot) => {
                res(interpretFirebaseDocument(snapshot.id, snapshot));
            });
        })
            .catch((e) => {
            if (e instanceof InternalError) {
                rej(e); // forward error
                return;
            }
            rej(new ForbiddenError(`Edit operation for firebase failed: ${e.message}`));
        });
    });
};
export const remove = (collRef, data) => {
    return new Promise((res, rej) => {
        collRef
            .doc(data.id)
            .delete()
            .then(() => {
            res({ id: data.id });
        })
            .catch((e) => {
            if (e instanceof InternalError) {
                rej(e); // forward error
                return;
            }
            rej(new ForbiddenError(`Add operation for firebase failed: ${e.message}`));
        });
    });
};
export const getAll = (collRef) => {
    return new Promise((res, rej) => {
        collRef
            .get()
            .then((querySnapshot) => {
            const data = [];
            querySnapshot.forEach((snapshot) => {
                data.push(interpretFirebaseDocument(snapshot.id, snapshot));
            });
            console.log(data);
            res(data);
        })
            .catch((e) => {
            if (e instanceof InternalError) {
                rej(e); // forward error
                return;
            }
            rej(new ForbiddenError(`Add operation for firebase failed: ${e.message}`));
        });
    });
};
//# sourceMappingURL=firestore.js.map