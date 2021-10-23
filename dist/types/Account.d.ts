declare type email = string;
export declare type AccountID = email;
export default interface Account {
    idToken?: string;
    uid?: string;
    type?: "Guest" | "User";
    name?: string;
    email?: string;
    photo?: string;
}
export {};
