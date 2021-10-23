type email = string;
export type AccountID = email;

export default interface Account {
  idToken?: string;
  uid?: string;
  type?: "Guest" | "User";
  name?: string;
  email?: string;
  photo?: string;
}
