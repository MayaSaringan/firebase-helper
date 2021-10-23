import React, { FunctionComponent, PropsWithChildren, useEffect } from "react";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/account";
import type Account from "./types/Account";

interface Props extends PropsWithChildren<unknown> {
  onAccountLogin?: (data: Account) => void;
  onAnonymousLogin?: (data: Account) => void;
  onLogout?: () => void;
}
const FirebaseProvider: FunctionComponent<Props> = ({
  children,
  onAccountLogin,
  onAnonymousLogin,
  onLogout,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onIdTokenChanged((user) => {
      if (user) {
        user.getIdToken().then((idToken: string) => {
          const { uid } = user;
          if (idToken) {
            if (user.providerData && user.providerData.length > 0) {
              const providerData = user.providerData[0] as firebase.UserInfo;
              dispatch(
                login({
                  idToken,
                  uid,
                  email: providerData.email || undefined,
                  name: providerData.displayName || undefined,
                  photo: providerData.photoURL || undefined,
                  type: "User",
                }),
              );
              onAccountLogin &&
                onAccountLogin({
                  idToken,
                  uid,
                  email: providerData.email || undefined,
                  name: providerData.displayName || undefined,
                  photo: providerData.photoURL || undefined,
                });
            } else {
              dispatch(
                login({
                  idToken,
                  uid,
                  email: undefined,
                  name: "Anonymous",
                  photo: undefined,
                  type: "Guest",
                }),
              );
              onAnonymousLogin &&
                onAnonymousLogin({
                  idToken,
                  uid,
                });
            }
          }
        });
      } else {
        console.log("Not logged in!");
        onLogout && onLogout();
        dispatch(logout());
      }
    });
  }, [onAccountLogin, onAnonymousLogin, onLogout, dispatch]);

  return <>{children}</>;
};
export default FirebaseProvider;
