import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { userLoginSchema } from "./lib/zod/validator";
import { getUserByEmail } from "./lib/authAction/user.actions";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid profile email", // Scopes par défaut
        },
      },
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = userLoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          // Si le user n'a pas de password : c'est qu'il s'est inscrit avec Google
          if (!user || !user.password) return null;

          // Comparer le password entré avec le password hashé en base de données
          const passwordMatch = await bcrypt.compare(password, user.password);

          // Si c'est bon, on retourne le user
          if (passwordMatch) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
