import NextAuth, { NextAuthOptions } from "next-auth";
import { SanityAdapter, SanityCredentials } from "next-auth-sanity";
import { client } from "../../../sanity/lib/client";

export const authOptions: NextAuthOptions = {
  providers: [SanityCredentials(client)],
  session: {
    strategy: "jwt",
  },
  secret: process.env.CRYPTO_SECRET_KEY,
  adapter: SanityAdapter(client),
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
