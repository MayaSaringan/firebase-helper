# firebase-helper

Wraps around the firebase API for Client in the exact fashion I usually use in my projects

## Installation

Built with [Node.js](https://nodejs.org/) v14.15.0

```sh
yarn
```

## Deployment

Create a build and upload it to the remote repo (under `dist/`)

```sh
yarn build
```

## Usage

Currently imported into projects as a github repo link in `package.json`

```json
"firebase-helper": "git://github.com/MayaSaringan/firebase-helper.git#commitHash",
```

```tsx
import firebaseHelper, { Provider, initialize, UserData } from "firebase-helper";

// Initialize firebase with your config. Must be done before doing anything else.
initialize(firebaseConfig);

// Wrap your app requiring firebase authentication services with a provider
// structured like this.
const FirebaseProvider: FunctionComponent<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const onAccountLogin = useCallback(
    (data: UserData) => {
      ...
    },
    [],
  );
  const onAnonymousLogin = useCallback(
    (data: UserData) => {
      ...
    },
    [],
  );
  const onLogout = useCallback(() => {
    ...
  }, []);
  return (
    <Provider
      onAccountLogin={onAccountLogin}
      onAnonymousLogin={onAnonymousLogin}
      onLogout={onLogout}
    >
      {children}
    </Provider>
  );
};


// for using the firestore wrapper api
const GenericAPI = firebaseHelper.firestore;
...
GenericAPI.add(fireStoreCollectionReference, yourData);
...

// using wrappers around firebase client auth methods
...
<Button onPress={firebaseHelper.auth.signInAnonymously}>
  START NOW
</Button>
...

```
