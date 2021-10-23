import { FunctionComponent, PropsWithChildren } from "react";
import type Account from "./types/Account";
interface Props extends PropsWithChildren<unknown> {
    onAccountLogin?: (data: Account) => void;
    onAnonymousLogin?: (data: Account) => void;
    onLogout?: () => void;
}
declare const FirebaseProvider: FunctionComponent<Props>;
export default FirebaseProvider;
