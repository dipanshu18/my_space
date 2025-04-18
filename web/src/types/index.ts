export interface IUser {
  id: string;
  image: string;
  name: string;
  email: string;
  provider: "GOOGLE" | "GITHUB";
  createdAt: Date;
  updatedAt: Date;
}
