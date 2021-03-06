import { ForbiddenError, InternalError } from "./error";
import firebase from "firebase";
import Metadata from "./types/Metadata";

interface MetadataDatabase {
  createdAt: firebase.firestore.FieldValue;
  editedAt: firebase.firestore.FieldValue;
}

export const createMetadata = (): MetadataDatabase => ({
  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  editedAt: firebase.firestore.FieldValue.serverTimestamp(),
});
export const updateMetadata = (): Omit<MetadataDatabase, "createdAt"> => ({
  editedAt: firebase.firestore.FieldValue.serverTimestamp(),
});

const interpretFirebaseDocument = <T>(
  id: firebase.firestore.DocumentData["id"],
  snapshot: firebase.firestore.DocumentSnapshot,
): T => {
  const snapshotData = snapshot.data();
  if (!snapshot.exists || !snapshotData) {
    throw new InternalError("data is null");
  }
  const { createdAt, editedAt, ...filteredData } = snapshotData;
  const data: T = {
    ...filteredData,
    createdAt: createdAt.toMillis(),
    editedAt: editedAt.toMillis(),
    id,
  } as unknown as T & Metadata;
  return data;
};

export const add = <T>(
  collRef: firebase.firestore.CollectionReference,
  data: Omit<T, "id">,
): Promise<T> => {
  return collRef
    .add({
      ...data,
      ...createMetadata(),
    })
    .then((docRef) => docRef.get())
    .then((snapshot) =>
      Promise.resolve(interpretFirebaseDocument<T>(snapshot.id, snapshot)),
    )
    .catch((e) => {
      if (e instanceof InternalError) {
        throw e;
      }
      throw new ForbiddenError(
        `Add operation for firebase failed: ${e.message}`,
      );
    });
};

export const set = <T>(
  collRef: firebase.firestore.CollectionReference,
  data: T,
): Promise<T> => {
  const { id, ...restData } = data as T & { id: string };
  console.log(restData);
  return collRef
    .doc(id)
    .get()
    .then((snapshot) =>
      collRef.doc(id).set(
        {
          ...restData,
          ...(snapshot.exists ? updateMetadata() : createMetadata()),
        },
        { merge: true },
      ),
    )
    .then(() => collRef.doc(id).get())
    .then((snapshot) =>
      Promise.resolve(interpretFirebaseDocument<T>(snapshot.id, snapshot)),
    )
    .catch((e) => {
      if (e instanceof InternalError) {
        throw e;
      }
      throw new ForbiddenError(
        `Set operation for firebase failed: ${e.message}`,
      );
    });
};

export const edit = <T>(
  collRef: firebase.firestore.CollectionReference,
  data: T,
): Promise<T> => {
  const { id, ...restData } = data as T & { id: string };
  return collRef
    .doc(id)
    .update({
      ...restData,
      ...updateMetadata(),
    })
    .then(() => collRef.doc(id).get())
    .then((snapshot) =>
      Promise.resolve(interpretFirebaseDocument<T>(snapshot.id, snapshot)),
    )
    .catch((e) => {
      if (e instanceof InternalError) {
        throw e;
      }
      throw new ForbiddenError(
        `Edit operation for firebase failed: ${e.message}`,
      );
    });
};

export const remove = (
  collRef: firebase.firestore.CollectionReference,
  data: { id: string },
): Promise<{ id: string }> => {
  return collRef
    .doc(data.id)
    .delete()
    .then(() => ({ id: data.id }))
    .catch((e) => {
      if (e instanceof InternalError) {
        throw e;
      }
      throw new ForbiddenError(
        `Add operation for firebase failed: ${e.message}`,
      );
    });
};

export const get = <T>(
  collRef: firebase.firestore.CollectionReference,
  id: string,
): Promise<T> => {
  return collRef
    .doc(id)
    .get()
    .then((snapshot) =>
      Promise.resolve(interpretFirebaseDocument<T>(snapshot.id, snapshot)),
    )
    .catch((e) => {
      if (e instanceof InternalError) {
        throw e;
      }
      throw new ForbiddenError(
        `Add operation for firebase failed: ${e.message}`,
      );
    });
};

export const getAll = <T>(
  collRef: firebase.firestore.CollectionReference,
): Promise<T[]> => {
  return collRef
    .get()
    .then((querySnapshot) => {
      const data: T[] = [];
      querySnapshot.forEach((snapshot) => {
        data.push(interpretFirebaseDocument(snapshot.id, snapshot));
      });
      return data;
    })
    .catch((e) => {
      if (e instanceof InternalError) {
        throw e;
      }
      throw new ForbiddenError(
        `Add operation for firebase failed: ${e.message}`,
      );
    });
};
