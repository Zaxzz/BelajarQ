import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import kontenbase from "../kontenbase/init";

export const authProviders = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;

      try {
        const { user, error } = await kontenbase.auth.login({
          email: credentials.email,
          password: credentials.password,
        });

        if (error || !user) {
          console.error("Login failed:", error?.message);
          return null;
        }

        return { id: user._id, name: user.userName, email: user.email };
      } catch (error) {
        console.error("Authorization error:", error);
        return null;
      }
    },
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    authorization: {
      params: {
        prompt: "consent select_account",
        access_type: "offline",
        response_type: "code",
      },
    },
  }),
];
