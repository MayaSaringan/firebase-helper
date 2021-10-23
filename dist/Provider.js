import React, { useEffect } from "react";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/account";
const FirebaseProvider = ({ children, onAccountLogin, onAnonymousLogin, onLogout, }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        firebase.auth().onIdTokenChanged((user) => {
            if (user) {
                user.getIdToken().then((idToken) => {
                    const { uid } = user;
                    if (idToken) {
                        if (user.providerData && user.providerData.length > 0) {
                            const providerData = user.providerData[0];
                            dispatch(login({
                                idToken,
                                uid,
                                email: providerData.email || undefined,
                                name: providerData.displayName || undefined,
                                photo: providerData.photoURL || undefined,
                                type: "User",
                            }));
                            onAccountLogin &&
                                onAccountLogin({
                                    idToken,
                                    uid,
                                    email: providerData.email || undefined,
                                    name: providerData.displayName || undefined,
                                    photo: providerData.photoURL || undefined,
                                });
                        }
                        else {
                            dispatch(login({
                                idToken,
                                uid,
                                email: undefined,
                                name: "Anonymous",
                                photo: undefined,
                                type: "Guest",
                            }));
                            onAnonymousLogin &&
                                onAnonymousLogin({
                                    idToken,
                                    uid,
                                });
                        }
                    }
                });
            }
            else {
                console.log("Not logged in!");
                onLogout && onLogout();
                dispatch(logout());
            }
        });
    }, [onAccountLogin, onAnonymousLogin, onLogout, dispatch]);
    return React.createElement(React.Fragment, null, children);
};
export default FirebaseProvider;
//# sourceMappingURL=Provider.js.map