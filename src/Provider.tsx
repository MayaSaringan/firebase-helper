import React, { FunctionComponent, PropsWithChildren, useEffect } from "react";
import firebase from "firebase";
export interface UserData {
  idToken: string;
  uid: string;
  email?: string | null;
  name?: string | null;
  photo?: string | null;
}
interface Props extends PropsWithChildren<unknown> {
  onAccountLogin: (data: UserData) => void;
  onAnonymousLogin: (data: UserData) => void;
  onLogout: () => void;
}
const FirebaseProvider: FunctionComponent<Props> = ({
  children,
  onAccountLogin,
  onAnonymousLogin,
  onLogout,
}) => {
  useEffect(() => {
    firebase.auth().onIdTokenChanged((user) => {
      if (user) {
        user.getIdToken().then((idToken: string) => {
          const { uid } = user;
          if (idToken) {
            if (user.providerData && user.providerData.length > 0) {
              const providerData = user.providerData[0] as firebase.UserInfo;
              onAccountLogin({
                idToken,
                uid,
                email: providerData.email,
                name: providerData.displayName,
                photo: providerData.photoURL,
              });
            } else {
              onAnonymousLogin({
                idToken,
                uid,
              });
            }
          }
        });
      } else {
        console.log("Not logged in!");
        onLogout();
      }
    });
  }, [onAccountLogin, onAnonymousLogin, onLogout]);

  return <>{children}</>;
};
export default FirebaseProvider;
