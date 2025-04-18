import jwt from "jsonwebtoken";

import { JWT_ACCESS_SECRET } from "../constants/env";

interface IUser {
  id: string;
  email: string;
}

export function generateToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_ACCESS_SECRET);
}
