export type UserAccount = {
  id: number
}

export type User = {
  id: number;
  email: string;
  name: string;
  account: UserAccount
};
