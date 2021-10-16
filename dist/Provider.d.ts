import { FunctionComponent, PropsWithChildren } from "react";
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
declare const FirebaseProvider: FunctionComponent<Props>;
export default FirebaseProvider;
