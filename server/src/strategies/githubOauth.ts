import passport from "passport";
import { Strategy } from "passport-github2";

import {
  GITHUB_CALLBACK_URL,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} from "../constants/env";
import { db } from "../utils/db";

passport.use(
  new Strategy(
    {
      callbackURL: GITHUB_CALLBACK_URL,
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    },
    // @ts-ignore
    async (_accessToken, _refreshToken, profile, done) => {
      if (!profile.emails || !profile.photos) {
        return done(null, false, {
          message: "Missing email or photo in profile",
        });
      }

      const existingUser = await db.user.findFirst({
        where: { email: profile?.emails[0].value },
        omit: { providerId: true },
      });

      if (existingUser?.provider === "GOOGLE") {
        return done(null, false, {
          message: "You have signed up with Google",
        });
      }

      if (!existingUser) {
        const newUser = await db.user.create({
          data: {
            email: profile.emails[0].value,
            name: profile.displayName,
            provider: "GITHUB",
            providerId: profile.id,
            image: profile.photos[0].value ?? "",
          },
        });

        return done(null, newUser);
      }

      return done(null, existingUser);
    }
  )
);
