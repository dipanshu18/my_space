import type { CookieOptions } from "express";

import { NODE_ENV } from "../constants/env";

const secure = NODE_ENV !== "development";

const defaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure,
};

export function getTokenCookieOptions(): CookieOptions {
  return {
    ...defaults,
  };
}
