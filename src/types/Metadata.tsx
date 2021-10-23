export default interface Metadata {
  createdAt: number;
  editedAt: number;
  type: "Profile" | "BankAccount" | "Transaction" | "Category";
}
