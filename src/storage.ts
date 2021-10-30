import firebase from "firebase";

// following are specialized to handle base64 string image uploads

const getExtension = (base64string: string) => {
  return base64string.substring(
    "data:image/".length,
    base64string.indexOf(";base64"),
  );
};

const getHttpUrl = (bucket: string, storagePath: string) => {
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${storagePath.replaceAll(
    "/",
    "%2F",
  )}?alt=media`;
};

// return url to file
export const upload = (
  bucket: string,
  uploadString: string,
  path: string,
  name: string,
  type: "base64" | string,
): Promise<string> => {
  if (type !== "base64") {
    throw new Error(
      "Unsupported type format for upload. See README for supported file formats",
    );
  }
  const rinsedPath = path.charAt(path.length - 1) === "/" ? path : path + "/";
  return firebase
    .storage()
    .ref()
    .child(`${rinsedPath}${name}.${getExtension(uploadString)}`)
    .putString(uploadString, "data_url")
    .then((snap) => {
      return Promise.resolve(getHttpUrl(bucket, snap.metadata.fullPath));
    });
};
