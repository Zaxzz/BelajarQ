import { syncGoogleUser } from "@/services/auth/authFunctions";

export const authCallbacks = {
  async jwt({ token, user, account }) {
    if (account?.provider === "credentials") {
      token.email = user.email;
      token.userName = user.userName;
    }
    if (account?.provider === "google") {
      const data = {
        email: user.email,
        userName: user.name,
      };
      await syncGoogleUser(data, (data) => {
        token.email = data.email;
        token.userName = data.userName;
      });
    }
    return token;
  },

  async session({ session, token }) {
    session.user.id = token.id;
    session.user.email = token.email;
    session.user.name = token.name;
    session.user.provider = token.provider;
    return session;
  },
};
