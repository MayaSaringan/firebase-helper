import React, { useEffect } from "react";
import firebase from "firebase";
const FirebaseProvider = ({ children, onAccountLogin, onAnonymousLogin, onLogout, }) => {
    useEffect(() => {
        firebase.auth().onIdTokenChanged((user) => {
            if (user) {
                user.getIdToken().then((idToken) => {
                    const { uid } = user;
                    if (idToken) {
                        if (user.providerData && user.providerData.length > 0) {
                            const providerData = user.providerData[0];
                            onAccountLogin({
                                idToken,
                                uid,
                                email: providerData.email,
                                name: providerData.displayName,
                                photo: providerData.photoURL,
                            });
                        }
                        else {
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
                onLogout();
            }
        });
    }, [onAccountLogin, onAnonymousLogin, onLogout]);
    return React.createElement(React.Fragment, null, children);
};
export default FirebaseProvider;
//# sourceMappingURL=Provider.js.map